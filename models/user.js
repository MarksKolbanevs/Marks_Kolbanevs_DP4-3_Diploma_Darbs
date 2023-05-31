const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        maxLength:320,
        required:true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    name:{
        type:String,
        maxLength:25,
        required:true,
    },
    photo:{
        type:String,
        required:false,
        default:'./assets/photos/default.png',
        maxLength:300,
    },
    phone:{
        type:Number,
        maxLength:15,
        required:false,
        default:"",
    },
    emailVerified:{
        type:Boolean,
        default:false,
    },
    validationPassed:{
        type:Boolean,
        default:false,
    },
    passwordHash:{
        type:String,
        maxLength:60,
        required:true,
    },
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;