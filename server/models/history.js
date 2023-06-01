const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new mongoose.Schema({
    user: {
        type:Schema.Types.ObjectId,
        ref:'User',
        reqired:true,
    },
    tag:{
        type:Schema.Types.ObjectId,
        ref:'Tag',
        required:true,
    },
    location:{
        longitude:{
            type:Number,
            maxLength:25,
            default:0,
        },
        latitude:{
            type:Number,
            maxLength:25,
            default:0,
        }
    },
    dateTime: {
        year: {
            type: String,
            maxLength: 5,
            default: new Date().getFullYear().toString(),
        },
        month: {
            type: String,
            maxLength: 2,
            default: (new Date().getMonth()+1).toString().padStart(2, '0'),
        },
        day: {
            type: String,
            maxLength: 2,
            default: new Date().getDate().toString().padStart(2, '0'),
        },
        hour:{
            type: String,
            maxLength: 2,
            default: new Date().getHours().toString().padStart(2, '0'),
        },
        minutes: {
            type: String,
            maxLength: 2,
            default: new Date().getMinutes().toString().padStart(2, '0'),
        },
        seconds: {
            type: String,
            maxLength: 2,
            default: new Date().getSeconds().toString().padStart(2, '0'),
        },
    },
});

const historyModel = mongoose.model('History', historySchema);
module.exports = historyModel;