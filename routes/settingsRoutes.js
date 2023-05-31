const Bug = require('./../models/bug');
const Room = require('./../models/room');
const Message = require('./../models/message');
const authenticateToken = require('../userAuthenticateToken');

const express = require('express');
const router = express.Router();
router.post('/bug',authenticateToken, async(req,res) =>{
    try{
        const bug = new Bug();
        bug.bug = req.body.bug;
        await bug.save();
        res.status(201).json({ message: 'Bug reported successfully' });
    }catch (e){
        res.status(400).json({ message: e });  
    }
});

module.exports = router;