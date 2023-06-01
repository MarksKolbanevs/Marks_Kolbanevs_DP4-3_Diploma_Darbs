const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const faqSchema = new mongoose.Schema({
    title:{
        type:String,
        maxLength:25,
        required:true
    },
    description:{
        type:String,
        maxLength:100,
        required:true,
    },
});

const faqModel = mongoose.model('faq', faqSchema);
module.exports = faqModel;