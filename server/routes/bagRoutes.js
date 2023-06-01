const Bag = require('./../models/bag');
const express = require('express');
const router = express.Router();
const authenticateToken = require('../adminAuthenticateToken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

router.post('/', authenticateToken, multer({ storage: multer.memoryStorage() }).single("main-photo"), async(req,res) =>{
    if(!req.file){
      res.status(400).json({ message: 'Image is not submitted' });
      return;
    }
    const user = req.user;
    const photo = req.file;
    const photoExtension = path.extname(photo.originalname).toLowerCase();
    const id = user.id;
    const bag = new Bag();
    const newDir = path.join(process.cwd(), '/assets/bags', bag._id.toString());
    const photoPath = path.join('./assets/bags', bag._id.toString(),'main-photo'+photoExtension); 
    const newFile = path.join(newDir, 'main-photo' + photoExtension);
    console.log(photoExtension);
    if(photoExtension !== '.png' && photoExtension !== '.jpg'){
      res.status(400).json({ message: 'Images can be only format of PNG or JPG' });
      console.log('incorrect');
      return;
    }
    try{
        await fs.promises.mkdir(newDir, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Created directory: ${newDir}`);
            }
        });
        await fs.promises.writeFile(newFile, photo.buffer, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Photo inserted`);
            }
        });
        bag.administrator = id;
        bag.name = req.body.name;
        bag.price = req.body.price;
        bag.description = req.body.description;
        bag.material = req.body.material;
        bag.photo = photoPath;
        bag.hex = req.body.hex;
        try{
            if(!await bag.save()){
              res.status(400).json({ message: 'Please enter all mandatory inputs'});
              return;
            }
            res.status(201).json({ message: 'Bag added successfully'});
        } catch (e) {
            res.status(500).json({ message: e });
            console.log(e);
        }
    } catch (e) {
        console.log(e);
    }
});

router.get('/bags', async (req, res) => {
    try {
      const bags = await Bag.find();
      if (!bags) {
        res.status(400).json({ message: 'Bag not found' });
        return;
      }
      const updatedBags = bags.map(bag => {
        const photoPath = bag.photo;
        const photo = fs.readFileSync(photoPath).toString('base64');
        bag.photo = photo;
        return bag;
      });
      res.status(200).json(updatedBags);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
});

router.patch('/', authenticateToken, multer({ storage: multer.memoryStorage() }).single("main-photo"), async(req,res) =>{
    const user = req.user;
    const id = user.id;
    const updates = req.body;

    try {
        const result = await Bag.updateOne({ _id: id }, { $set: updates });
        if(!result){
          res.status(400).json('Bag not updated!');
          return;
        }
        console.log(result);
        res.status(200).json('Bag updated!');
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
    return;
  });

  router.get('/', async (req, res) => {
    const id = req.query.bag;
    try {
      const bag = await Bag.findById(id);
      if (!bag) {
        res.status(400).json({ message: 'User not found' });
        return;
      }
      const photoPath = bag.photo;
      const photo = fs.readFileSync(photoPath).toString('base64');
      bag.photo = photo;
  
      res.status(200).json(bag);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get('/search', async (req,res) =>{
    const query = req.query.query;
    try{
        const bags = await Bag.find({ name: new RegExp(query) });
        const updatedBags = bags.map(bag => {
          const photoPath = bag.photo;
          const photo = fs.readFileSync(photoPath).toString('base64');
          bag.photo = photo;
          return bag;
        });
        res.status(200).json(updatedBags);
    } catch (e) {
        console.log(e);
    }

  });

module.exports = router;