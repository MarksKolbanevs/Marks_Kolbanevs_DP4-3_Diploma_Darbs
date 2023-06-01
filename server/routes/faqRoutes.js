const express = require('express');
const router = express.Router();
const Faq = require('./../models/faq');

router.get('/', async(req,res) =>{
    try {
        faq = await Faq.find();
        if(faq){
            res.status(200).json(faq); 
        }else{
            res.status(400).json({ message: 'Something went wrong' }); 
        }
    } catch (e) {
        res.status(500).json({ message: e });
    }
});

module.exports = router;