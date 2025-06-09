const mongoose = require('mongoose')

const UserSchema =new mongoose.Schema({
    name:{
        type:String,
        require
    },
    email:{
        type:String,
        require
    },
    password:{
        type:String,
        require
    },
    role:{
        type:String,
        default:"jobseeker"
    },
},
{timeStamps:true})
const UserModel =mongoose.model('user',UserSchema)
module.exports =UserModel
