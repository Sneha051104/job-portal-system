const mongoose = require('mongoose')

const ContactSchema =new mongoose.Schema({
    name:{
        type:String,
        require
    },
    email:{
        type:String,
        require
    },
    subject:{
        type:String,
        require
    },
    message:{
        type:String,
        require
    },
})
const ContactModel =mongoose.model('contact',ContactSchema)
module.exports =ContactModel
