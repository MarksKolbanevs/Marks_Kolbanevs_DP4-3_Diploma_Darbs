const Tag = require('./../models/tag');
const express = require('express');
const router = express.Router();
const authenticateToken = require('../userAuthenticateToken');

router.post('/',authenticateToken, async(req,res) =>{
    const user = req.user;
    const id = user.id;
    try{
        const tag = new Tag();
        tag.uuid = req.body.uuid;
        tag.name = req.body.name;
        tag.bag = req.body.bag;
        tag.photo = req.body.photo;
        tag.condition = req.body.condition;
        tag.user = id;
        await tag.save();
        res.status(201).json({ message: 'Tag added successfully' });
    }catch (e){
        res.status(400).json({ message: e });  
    }
});

router.patch('/',authenticateToken, async(req,res) =>{
    try{
        const foundedTag = await Tag.findOneAndUpdate(
            {'uuid': req.body.uuid},
            {'condition':req.body.condition},
            {new:true}
        );
        if (foundedTag) {
            console.log(req.body.condition);
            res.status(201).json({ message: 'Tag updated' });
          } else {
            res.status(400).json({ message: 'Tag not found' });
          }
    } catch (e) {
        res.status(400).json({ message: e }); 
    }
});

router.patch('/callibrate',authenticateToken, async(req,res) =>{
    try{
        const foundedTag = await Tag.findOne({'uuid': req.body.uuid});
        if (foundedTag) {
            const foundedTagCondition = foundedTag.condition;
            await foundedTag.updateOne({'condition':!foundedTagCondition});

            res.status(201).json({ message: 'Tag updated' });
          } else {
            res.status(400).json({ message: 'Tag not found' });
          }
    } catch (e) {
        res.status(400).json({ message: e }); 
    }
});

router.patch('/update', authenticateToken, async(req,res) =>{
    const uuid = req.body.uuid;
    const updates = req.body;
    await updates.uuid;
    try {
        const result = await Tag.updateOne({ uuid: uuid }, { $set: updates });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.patch('/update/photo', authenticateToken, async(req,res) =>{
    const uuid = req.body.uuid;
    const photoPath = req.body.photo;
    try {
        const result = await Tag.updateOne({ uuid: uuid }, { photo : photoPath});
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.delete('/', authenticateToken, async(req,res) => {
    const uuid = req.body.uuid;
    try{
        const result = await Tag.deleteOne({uuid:uuid});
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json(e);
    }
});
module.exports = router;
