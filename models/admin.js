const mongoose = require('mongoose')

const AdminSchema =new mongoose.Schema({
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
        default:"admin"
    },
},
{timeStamps:true})
const AdminModel =mongoose.model('admin',AdminSchema)
module.exports =AdminModel
