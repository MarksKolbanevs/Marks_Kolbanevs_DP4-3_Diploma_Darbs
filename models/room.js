const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new mongoose.Schema({
    occupancy: {
       type:Number,
       default:2, 
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        reqired:true,
    },
    helper:{
        type:Schema.Types.ObjectId,
        ref:'User',
        reqired:true,
    },
});

const gameModel = mongoose.model('Room', roomSchema);
module.exports = gameModel;