const mongoose = require('mongoose');

const helperSchema = new mongoose.Schema({
    name:{
        type:String,
        maxLength:25,
        required:true,
    },
    surname:{
        type:String,
        maxLength:25,
        required:true,
    },
    email:{
        type:String,
        maxLength:255,
        required:true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    photo:{
        type:String,
        required:false,
        default:'./assets/photos/default.png',
    },
    passwordHash:{
        type:String,
        maxLength:60,
        required:true,
    },
    phone:{
        type:Number,
        maxLength:15,
        required:false,
        default:null,
    }
});

const helperModel = mongoose.model('Helper', helperSchema);
module.exports = helperModel;