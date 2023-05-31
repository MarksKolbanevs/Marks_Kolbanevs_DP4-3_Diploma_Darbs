const History = require('./../models/history');
const Tag = require('./../models/tag');

const express = require('express');
const router = express.Router();
const authenticateToken = require('../userAuthenticateToken');

router.post('/', authenticateToken, async(req,res) =>{
    const history = new History();
    const user = req.user;
    const id = user.id;
    const tagUuid = req.body.tagUuid;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    //
    const result = await Tag.findOne({'uuid':tagUuid});
    if(result == null){
        res.status(401).json({ message: 'Tag not found' }); 
        return;
    }
    const tagID = result._id;
    //
    history.user = id;
    history.tag = tagID;
    history.location.latitude = latitude;
    history.location.longitude = longitude;
    try{
        await history.save();
        res.status(201).json({ message: 'History added successfully' });
    }catch (e){
        res.status(400).json({ message: e });
        console.log(e);
    }
});

router.get('/', authenticateToken, async(req,res) =>{
    const user = req.user;
    const id = user.id;
    const history = await History.find({user:id}).populate('tag');
    console.log(history);
    
    try {
        if (history.length === 0) {
            res.status(204).send();
        } else {
            res.status(200).json(history);
        }
    } catch (e) {
        res.status(400).json({ message: e });
    }
});

module.exports = router;