const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bagSchema = new mongoose.Schema({
    name:{
        type:String,
        maxLength:20,
        required:true,
    },
    description:{
        type:String,
        maxLength:150,
        required:true,
    },
    material:{
        type:String,
        maxLength:60,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    photo:{
        type:String,
        maxLength:200,
        required:true,
    },
    hex:{
        type:String,
        maxLength:16,
        required:true,
    },
    administrator:{
        type:Schema.Types.ObjectId,
        ref:'Administrator',
        required:true,
    }
});

const bagModel = mongoose.model('Bag', bagSchema);
module.exports = bagModel;