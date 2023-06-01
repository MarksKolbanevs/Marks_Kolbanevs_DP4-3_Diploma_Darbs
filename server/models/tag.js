const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new mongoose.Schema({
    uuid:{
        type:String,
        maxLength:36,
        required:true,
        unique: true,
    },
    name:{
        type:String,
        maxLength:25,
        required:true,
    },
    condition:{
        type:Boolean,
        default:false,
        required:true,
    },
    photo:{
        type:String,
        maxLength:300,
        default:false,
        required:true,
    },
    bag:{
        type:Schema.Types.ObjectId,
        ref:'Bag',
        required:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
});

const tagModel = mongoose.model('Tag', tagSchema);
module.exports = tagModel;