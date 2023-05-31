const BagUuid = require('../models/BagUuid');
const Bag = require('../models/bag');
const express = require('express');
const router = express.Router();

const authenticateToken = require('../userAuthenticateToken');

router.post('/', authenticateToken, async(req,res) =>{
    const uuid = req.body.uuid;
    const user = req.user;
    const id = user.id;
    try{
        const bag = new Bag();
        bag.uuid = uuid;
        bag.user = id;
        await bag.save();
        res.status(201).json({ message: 'Bag added successfully' });

    }catch (e){
        res.status(400).json({ message: e });
        console.log(e);
    }
});

router.get('/',authenticateToken,async(req,res) =>{
    const user = req.user;
    const id = user.id;
    try {
        const bagWithUuid = await BagUuid.find({user:id}).populate('bag');
        const bag = bagWithUuid[0].bag;
        if(bag){
            res.status(200).json(bag); 
        }else{
            res.status(400).json({ message: 'Something went wrong' }); 
        }
    } catch (e) {
        res.status(500).json({ message: e });
    }
});

router.get('/uuid',authenticateToken,async(req,res) =>{
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