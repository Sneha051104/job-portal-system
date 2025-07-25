const mongoose = require('mongoose')
// const Local_url ="mongodb://127.0.0.1:27017/jobportal"

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.LIVE_MONGO_URL)
        console.log("connectDb")
    }catch(error){
        console.log(error)
    }
}

module.exports=connectDb