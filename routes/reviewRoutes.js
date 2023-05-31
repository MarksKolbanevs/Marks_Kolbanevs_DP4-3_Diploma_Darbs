const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const authenticateToken = require('../userAuthenticateToken');
const fs = require('fs');
const path = require('path');


router.post('/', authenticateToken, async(req,res) =>{
    const review = req.body.review;
    const user = req.user;
    const id = user.id;
    try{
        const reviewModel = new Review();
        reviewModel.review = review;
        reviewModel.user = id;
        await reviewModel.save();
        res.status(201).json({ message: 'Review added successfully' });
    }catch (e){
        res.status(400).json({ message: e });
        console.log(e);
    }
});

router.post('/like', authenticateToken, async(req,res) =>{
  const user = req.user;
  const id = user.id;
  const reviewID = req.body.review;
  try{
    Review.findOne({ _id: reviewID, likes: {$in: [id]}}).exec().then(async review => {
        if (review) {
            // The user has already liked the review
            if(await Review.findOneAndUpdate({ _id: reviewID },{ $pull: { likes: id } },{ new: true })){
              res.status(200).json({ message: 'Like deleted' });
              return;
            }
            res.status(200).json({ message: 'Could not delete a like' });
            return;
        } else {
            // The user has not liked the review
            if(await Review.findOneAndUpdate({ _id: reviewID },{ $addToSet: { likes: id } },{ new: true })){
              res.status(200).json({ message: 'You liked a review!' });
              return;
            }
            res.status(400).json({ message: 'Could not like an review!' });
        }
    });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error });
  }
});

router.get('/', async (req,res) => {
    try {
      const reviews = await Review.find().populate('user');
      if (!reviews) {
        res.status(400).json({ message: 'Reviews not found' });
        return;
      }
      const updatedReviews = reviews.map(review => {
        const photoPath = review.user.photo;
        const photo = fs.readFileSync(photoPath).toString('base64');
        review.user.photo = photo;
        return review;
      });
      res.status(200).json(updatedReviews);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;