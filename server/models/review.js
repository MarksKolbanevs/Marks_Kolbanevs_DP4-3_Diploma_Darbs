const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    review:{
        type:String,
        maxLength:150,
        required:true,
    },
    likes:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
});

const reviewModel = mongoose.model('review', reviewSchema);
module.exports = reviewModel;