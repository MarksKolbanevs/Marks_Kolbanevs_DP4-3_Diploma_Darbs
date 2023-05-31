const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bagUuidSchema = new mongoose.Schema({
    bag:{
        type:Schema.Types.ObjectId,
        ref:'Bag',
        required:true,
    },
    uuid:{
        type:String,
        maxLength:100,
        unique:true,
        required:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
    }
});

const bagUuidModel = mongoose.model('Uuid', bagUuidSchema);
module.exports = bagUuidModel;