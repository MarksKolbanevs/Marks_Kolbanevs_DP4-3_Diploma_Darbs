const Administrator = require('./../models/administrator');
const User = require('./../models/user');
const Bag = require('./../models/bag');
const express = require('express');
const router = express.Router();
const authenticateToken = require('../adminAuthenticateToken');
const fs = require('fs');
const path = require('path');

function deleteDir(folderPath){
  fs.rm(folderPath, { recursive: true }, (err) => {
      if (err) {
        console.error('Error deleting folder:', err);
      } else {
        console.log('Folder deleted successfully');
      }
  });
}

router.get('/', authenticateToken, async (req, res) => {
  const administrator = req.administrator;
  const id = administrator.id;
    try {
      const query = { _id: id };
      const administrator = await Administrator.findOne(query);
      if (!administrator) {
        res.status(400).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(administrator);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});

router.get('/users', authenticateToken, async (req, res) => {
    try {
      const users = await User.find({} ,'-passwordHash');
      if (!users) {
        res.status(400).json({ message: 'User not found' });
        return;
      }
      const updatedUsers = users.map(user => {
        const photoPath = user.photo;
        const photo = fs.readFileSync(photoPath).toString('base64');
        user.photo = photo;
        return user;
      });
      res.status(200).json(updatedUsers);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
});

router.get('/users/search', authenticateToken, async (req,res) =>{
  const query = req.query.query;
  try{
      const users = await User.find({ email: new RegExp(query) });
      const updatedBags = users.map(user => {
        const photoPath = user.photo;
        const photo = fs.readFileSync(photoPath).toString('base64');
        user.photo = photo;
        return user;
      });
      res.status(200).json(updatedBags);
  } catch (e) {
      console.log(e);
  }
});

router.get('/bags', authenticateToken, async (req, res) => {
  try {
    const bags = await Bag.find();
    if (!bags) {
      res.status(400).json({ message: 'User not found' });
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

router.post('/bag', authenticateToken, async (req, res) => {
  const id = req.body.bag;
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

router.delete('/user', authenticateToken, async (req, res) => {
  const id = req.body.id;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({message:'User deleted'});
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/bag', authenticateToken, async (req, res) => {
  const id = req.body.id;
  try {
    const bag = await Bag.findByIdAndDelete(id);
    const bagPath = path.join(process.cwd(), '/assets/bags', bag._id.toString());
    if (!bag) {
      res.status(400).json({ message: 'Bag not found' });
      return;
    }
    deleteDir(bagPath);
    res.status(200).json({message:'Bag deleted'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;