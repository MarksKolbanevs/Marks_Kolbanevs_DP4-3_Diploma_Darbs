const Bug = require('./../models/bug');
const express = require('express');
const router = express.Router();
const authenticateToken = require('../userAuthenticateToken');

router.post('/', authenticateToken, async(req,res) =>{
    const user = req.user;
    const id = user.id;
    const bug = new Bug();
    bug.user = id;
    bug.title = req.body.title;
    bug.bug = req.body.bug;
    try{
        
        await bug.save();
        res.status(201).json({ message: 'Bug reported successfully' });

    }catch (e){
        res.status(400).json({ message: e });
        console.log(e);
    }
});
module.exports = router;