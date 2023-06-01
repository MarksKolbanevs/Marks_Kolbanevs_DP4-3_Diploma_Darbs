const Room = require('./../models/room');
const express = require('express');
const router = express.Router();
const userAuthenticateToken = require('../userAuthenticateToken');
const helperAuthenticateToken = require('../helperAuthenticateToken');

router.post('/room', userAuthenticateToken, async(req,res) => {
    const userID = req.body.userID;
    const assistantID = '643d47517f735a0e2c7cf0b4';
    try{
        const room = new Room();
        room.userID = userID;
        room.humanChatAssistantID = assistantID;
        await room.save();
        res.status(201).json({ message: 'Room created' });
    } catch (e){
        res.status(400).json({ message: e });
    }
});
router.post('/room/message', userAuthenticateToken, async(req,res) => {
    const userID = req.body.userID;
    const roomID = req.body.roomID;
    const text = req.body.text;
    try{
        const message = new Message();
        message.userID = userID;
        message.roomID = roomID;
        message.text = text;
        await message.save();
        res.status(201).json({ message: 'Message created' });
        //res.status(201).json({ message: 'Room created' });
    } catch (e){
        res.status(400).json({ message: e });
    }
});
module.exports = router;