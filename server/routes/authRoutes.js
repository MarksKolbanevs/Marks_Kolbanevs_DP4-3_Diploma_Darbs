const User = require('./../models/user');
const Administrator = require('./../models/administrator');
const Helper = require('./../models/helper');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const authenticateToken = require('../userAuthenticateToken');

// Generate a verification token
// function generateVerificationToken(email) {
//   return jwt.sign({ email }, 'your-secret-key', { expiresIn: '1h' });
// }

// Send verification email
async function sendVerificationEmail(email, verificationToken){
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'onecupoftea8@gmail.com',
      pass: 'jjufugbalctmzing',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: 'onecupoftea8@gmail.com',
    to: email,
    subject: 'Email Verification',
    html: `
      <h1>Email Verification</h1>
      <p>Please click the following link to verify your email:</p>
      <a href="http://localhost:3000/verify?token=${verificationToken}">Verify Email</a>
    `,
  };

  if(await transporter.sendMail(mailOptions)){
    return true;
  }else{
    return false;
  }
}

router.post('/signup', async (req, res) => {
    try{
        const user = new User();
        let password= req.body.password;
        let repeatPassword = req.body.repeatPassword;
        let email = req.body.email;
        let name = req.body.name;
        const checkForRegisteredUser = await User.find({email});

        if(checkForRegisteredUser.length > 0){
          res.status(400).json({ message: 'This user already exists'});
          return;
        }

        if(email == undefined || password == undefined || name == undefined){
          res.status(400).json({ message: 'Please fill all mandatory inputs'});
          return;
        }

        if(password.length <= 5){
          res.status(400).json({ message: 'Please make your password more than 5 symbols!'});
          return;
        }

        if(password != repeatPassword){
          res.status(400).json({ message: 'Please enter two similar passwords!'});
          return;
        }

        //Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Pushing values to new user
        user.email = email;
        user.name = name;
        user.passwordHash = hashedPassword;

        //Saving user
        const newUser = await user.save();

        //Creating JWT token for it
        const verificationToken = jwt.sign({ id: newUser._id}, 'I love cookies');

        // Send verification email
        if(!sendVerificationEmail(email, verificationToken)){
          res.status(400).json({ message: 'This email doesnt exists!'});
          return;
        }
        
        res.status(201).json({ message: 'Please check your email to verificate', token:verificationToken});
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: e });
    }
});

router.get('/send-verify', authenticateToken, async(req,res) =>{
  const authHeader = req.headers['authorization'];
  const verificationToken = authHeader && authHeader.split(' ')[1];
  const email = req.query.email;

  // Send verification email
  if(!sendVerificationEmail(email, verificationToken)){
    res.status(400).json({ message: 'Could not send verification email!'}); 
  }
  res.status(201).json({ message: 'Please check your email to verificate', token:verificationToken});
})

// Email verification endpoint
router.get('/verify', async (req, res) => {
  const token = req.query.token;
  try {
    // Verify the token
    const decoded = jwt.verify(token, 'I love cookies');
    const id = decoded.id;

    // Find the user in the database
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Mark the user as verified
    user.emailVerified = true;

    //Trying to update email verified field of user
    if(!await user.save()){
      return res.status(404).json({ error: 'User was not updated' });
    }

    //If OK sending message about success
    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid or expired token' });
  }
});

router.get('/login', async (req, res) => {
      try {
        const email = req.query.email;
        const password = req.query.password;
        if(email == undefined || password == undefined){
          res.status(400).json({ message: 'Please fill all mandatory inputs'});
          return;
        }
        const query = { email: email };
        const user = await User.findOne(query);
        if (!user) {
          res.status(400).json({ message: 'User not found' });
          return;
        }
        const storedHash = user.passwordHash;
        const passwordsMatch = await bcrypt.compare(password, storedHash);
        if(!passwordsMatch){
          res.status(400).json({ message: 'Email or password is incorrect' });
          return;
        }
        const token = jwt.sign({ id: user._id }, 'I love cookies');
        res.status(200).json({token:token});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
});

router.get('/admin-login', async (req, res) => {
  try {
      const email = req.query.email;
      const password = req.query.password;
      if(email == undefined || password == undefined){
        res.status(400).json({ message: 'Please fill all mandatory inputs'});
        return;
      }
      const query = { email: email };
      const user = await Administrator.findOne(query);
      if (!user) {
        res.status(400).json({ message: 'User not found' });
        return;
      }
      const storedHash = user.passwordHash;
      const passwordsMatch = await bcrypt.compare(password, storedHash);
      if(!passwordsMatch){
        res.status(400).json({ message: 'Email or password is incorrect' });
        return;
      }
      const token = jwt.sign({ id: user._id }, 'I love kebabs');
      res.status(200).json({token:token});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});

router.get('/helper-login', async (req, res) => {
  try {
      const email = req.query.email;
      const password = req.query.password;
      if(email == undefined || password == undefined){
        res.status(400).json({ message: 'Please fill all mandatory inputs'});
        return;
      }
      const query = { email: email };
      const helper = await Helper.findOne(query);
      if (!helper) {
        res.status(400).json({ message: 'Helper not found' });
        return;
      }
      const storedHash = helper.passwordHash;
      const passwordsMatch = bcrypt.compare(password, storedHash);
      if(!passwordsMatch){
        res.status(400).json({ message: 'Email or password is incorrect' });
        return;
      }
      const token = jwt.sign({ id: helper._id }, 'I love sushi');
      res.status(200).json({token:token});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});


  module.exports = router;