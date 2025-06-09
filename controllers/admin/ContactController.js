const ContactModel = require('../../models/contact')
class ContactController {
    static contactInsert = async (req, res) => {
        try {
            // console.log(req.body)
            const {name,email,subject,message} = req.body
            const result = await ContactModel.create({
                name,
                email,
                subject,
                message,
            })
            req.flash('success',"Contact insert Successfully")
            res.redirect('/contact') //web.js
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports=ContactController