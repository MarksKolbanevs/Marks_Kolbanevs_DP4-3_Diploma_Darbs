const mongoose = require('mongoose');

const administratorSchema = new mongoose.Schema({
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
    phone:{
        type:Number,
        maxLength:15,
        required:false,
        default:null,
    },
    photo:{
        type:String,
        maxLength:200,
        required:false,
        default:'./assets/photos/default.png',
    },
    passwordHash:{
        type:String,
        maxLength:60,
        required:true,
    }
});

const administratorModel = mongoose.model('Administrator', administratorSchema);
module.exports = administratorModel;