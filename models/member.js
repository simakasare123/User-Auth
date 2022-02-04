const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const memberSchema = new Schema({
    name:{
        type:String
    },
    designation:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    age:{
        type:Number
    }
}, {timestamps:true})

const Member = mongoose.model('Member',memberSchema)
module.exports = Member