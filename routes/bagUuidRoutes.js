const express = require('express');
const router = express.Router();
const BagUuid = require('../models/uuid');
const authenticateToken = require('../adminAuthenticateToken');
const userAuthenticateToken = require('../userAuthenticateToken');
const multer = require('multer');
const csv = require('csv-parser')
const { Readable } = require('stream');

router.get('/check', userAuthenticateToken ,async(req,res) => {
    const user = req.user;
    const id = user.id;
    const uuid = req.query.uuid;
    try{
        if(!await BagUuid.findOne({user:id,uuid:uuid})){
            res.status(404).json({ message: 'Bag was not found for this user!'});
            return;
        }
        res.status(200).json({ message: 'Bag is registered!'});;
    } catch (e){
        res.status(500).json({ message: e});
        console.log(e);  
    }
});

router.post('/', authenticateToken, multer({ storage: multer.memoryStorage() }).single("uuid-csv"), async(req,res) =>{
    const user = req.user;
    const id = user.id;
    const csvBuffer = req.file.buffer;
    const bag = req.body.bag;
    try{
        Readable.from(csvBuffer.toString()).pipe(csv({
              headers: true, // Use the first row as headers
              separator: ',' // Use semicolon as delimiter (if necessary)
            })).on('data', (data) => {
                const csvResult = Object.values(data);
                csvResult.forEach(async(item) => {
                    let bagUuidModel = new BagUuid();
                    bagUuidModel.bag = bag;
                    bagUuidModel.uuid = item;
                    try{
                        await bagUuidModel.save();
                    } catch (e){
                        console.error(e);  
                    } 
                });
            });
            
        res.status(201).json({ message: 'Csv added successfully'});
        console.log('Csv added successfully');
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;