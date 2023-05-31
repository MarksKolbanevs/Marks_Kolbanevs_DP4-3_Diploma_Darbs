const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bugSchema = new mongoose.Schema({
    title:{
        type:String,
        maxLength:20,
        required:true
    },
    bug:{
        type:String,
        maxLength:300,
        required:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        reqired:true,
    }
});

const bugModel = mongoose.model('Bug', bugSchema);
module.exports = bugModel;