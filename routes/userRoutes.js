const User = require('./../models/user');
const express = require('express');
const router = express.Router();
const authenticateToken = require('../userAuthenticateToken');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const BagUuid = require('./../models/BagUuid');
const bcrypt = require('bcrypt');

// Create a new user
// router.post('/', async (req, res) => {
//     try{
//         const user = new User();
//         let password= req.body.password;
//         user.email = req.body.email;
//         user.name = req.body.name;
//         //Encrypt password
//         const hashedPassword = await bcrypt.hash(password, 10);
//         //
//         user.passwordHash = hashedPassword;
//         await user.save();
//         res.status(201).json({ message: 'User added successfully' });  
//     } catch (e) {
//         res.status(409).json({ message: e }); 
//     }
// });

router.get('/', authenticateToken, async (req, res) => {
  const user = req.user;
  const id = user.id;
    try {
      const user = await User.findById(id);
      if (!user) {
        res.status(400).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});

router.get('/photo', authenticateToken, async(req, res) => {
  const user = req.user;
  const id = user.id;
  try{
    const userData = await User.findById(id);
    const photoPath = userData.photo;
    const photo = fs.readFileSync(photoPath).toString('base64');
    res.status(200).json(photo);
  } catch (e){
    console.log(e);
    res.status(500).json(e);
  }
});

router.get('/bag/photo', authenticateToken, async(req, res) => {
  const user = req.user;
  const id = user.id;
  try{
    const bagWithUuid = await BagUuid.find({user:id}).populate('bag');
    const bag = bagWithUuid[0].bag;
    const bagPhotoPath = bag.photo;

    const photo = fs.readFileSync(bagPhotoPath).toString('base64');
    res.status(200).json(photo);
  } catch (e){
    console.log(e);
    res.status(500).json(e);
  }
});

const photoStorage = multer.diskStorage({
  destination:(req,file,cb) => {
    cb(null,'./assets/photos');
  },
  filename:(req, file,cb) => {
    const user = req.user.id;
    const fileName = user + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const uploadPhoto = multer({storage:photoStorage});

router.patch('/photo', authenticateToken, uploadPhoto.single("photo"), async(req,res) => {
  const id = req.user.id;
  const file = req.file;
  const photoPath = `./assets/photos/${id + path.extname(file.originalname)}`;
  try{
    const user = await User.findByIdAndUpdate(id,{photo:photoPath},{new:true});
    if(!user){
      res.status(400).json({ message: 'Photo not updated'});
    }
    res.status(200).json({ message: 'Photo updated'});
  } catch (e){
    res.status(500).json({ message:e});
    console.log(e);
  }
});

router.patch('/',authenticateToken,async(req,res) =>{
  const user = req.user;
  const id = user.id;
  const updates = req.body;
  try {
      await User.updateOne({ _id: id }, { $set: updates });
      res.status(200).json({message:'User updated!'});
  } catch (error) {
      res.status(400).json({message: error.message});
  }
  return;
});

router.post('/bag', authenticateToken, async(req,res) =>{
  const uuid = req.body.uuid;
  const bag = req.body.bag;
  const user = req.user;
  const id = user.id;
  try{
      const userBag = new UserBag();
      userBag.bag = bag;
      userBag.uuid = uuid;
      userBag.user = id;
      await userBag.save();
      res.status(201).json({ message: 'Bag added successfully' });

  }catch (e){
      res.status(400).json({ message: e });
      console.log(e);
  }
});

router.get('/bag',authenticateToken,async(req,res) =>{
  const user = req.user;
  const id = user.id;
  try {
      const bagWithUuid = await BagUuid.find({user:id}).populate('bag');
      if(bagWithUuid.length <= 0){
        res.status(400).json({ message: 'User have no bags' });
        return;
      }
      const bag = bagWithUuid[0].bag;
      if(bag){
          res.status(200).json(bag); 
      }else{
          res.status(400).json({ message: 'Something went wrong' }); 
      }
  } catch (e) {
    console.log(e);
      res.status(500).json({ message: e });
  }
});

router.patch('/password',authenticateToken,async(req,res) => {
  const user = req.user;
  const id = user.id;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  if(newPassword.length <= 0 || currentPassword.length <= 0){
    res.status(400).json({ message: 'Enter passwords!'});
    return;
  }
  try{
    const userDocument = await User.findById(id);
    const storedHash = userDocument.passwordHash;
    
    const passwordsMatch = await bcrypt.compare(currentPassword, storedHash);
      if(!passwordsMatch){
        res.status(400).json({ message: 'Current password is invalid!'});
        return;
      }
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    userDocument.passwordHash = newPasswordHash;

    if(!await userDocument.save()){
      res.status(400).json({ message: 'Could not update user password' });
    }
    res.status(200).json({ message: 'Password changed!' });
  } catch (error) {
    console.log(error);
  }
  
});

router.get('/bag/uuid',authenticateToken,async(req,res) =>{
  const user = req.user;
  const id = user.id;
  try {
      const bagWithUuid = await BagUuid.findOne({user:id});
      const uuid = bagWithUuid.uuid;
      if(uuid){
          res.status(200).json(uuid); 
      }else{
          res.status(400).json({ message: 'Something went wrong' }); 
      }
  } catch (e) {
      res.status(500).json({ message: e });
  }
});


module.exports = router;