const Favourite = require('./../models/favourite');
const express = require('express');
const router = express.Router();
const authenticateToken = require('../userAuthenticateToken');
const fs = require('fs');

router.post('/', authenticateToken, async(req,res) =>{
    const user = req.user;
    const id = user.id;
    const cart = new Favourite();
    cart.user = id;
    cart.bag = req.body.bag;
    try{
        await cart.save();
        res.status(201).json({ message: 'Added to favourite' });
    }catch (e){
        res.status(400).json({ message: e });
        console.log(e);
    }
});

router.get('/', authenticateToken, async (req, res) => {
    const user = req.user;
    const id = user.id;
    try {
      const cart = await Favourite.find({user:id}).populate('bag');
      if (!cart) {
        res.status(400).json({ message: 'Cart not found' });
        return;
      }
      const cartWithBagPhoto = cart.map(item => {
        const photoPath = item.bag.photo;
        const photo = fs.readFileSync(photoPath).toString('base64');
        item.bag.photo = photo;
        return item;
      });
      res.status(200).json(cartWithBagPhoto);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/item', authenticateToken, async (req, res) => {
  const id = req.body.item;
  try {
    const item = await Favourite.findByIdAndDelete(id);
    if (!item) {
      res.status(400).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({message:'Item deleted'});
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;