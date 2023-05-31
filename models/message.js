const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        default:null,
    },
    helper:{
        type:Schema.Types.ObjectId,
        ref:'Helper',
        default:null,
    },
    room:{
        type:Schema.Types.ObjectId,
        ref:'Room',
        reqired:true,
    },
    text:{
        type:String,
        require:true,
        maxLength:200,
    },
});

const messageModel = mongoose.model('Message', messageSchema);
module.exports = messageModel;