const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema({
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

const cartModel = mongoose.model('Cart', cartSchema);
module.exports = cartModel;