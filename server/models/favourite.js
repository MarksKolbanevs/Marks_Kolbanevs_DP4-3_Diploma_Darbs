const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favouriteSchema = new mongoose.Schema({
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

const favouriteModel = mongoose.model('Favourite', favouriteSchema);
module.exports = favouriteModel;