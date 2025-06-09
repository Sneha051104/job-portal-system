const jwt = require("jsonwebtoken")

const checkAuth = (req,res,next)=>{
    // console.log("hello auth")
    const token =req.cookies.token
    // console.log(token)
    if(!token){
        res.flash("error","Unauthorized user Please login")
        res.redirect('/login')
    }
    try{
        const decoded = jwt.verify(token,"jhfhhfpnijhahfj7674hg")
        // console.log(decoded)
        req.user = decoded
        // console.log(req.user)
        next()
    }catch(error){
        return res.redirect('/login')
    }

}

module.exports = checkAuth;