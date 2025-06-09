const AdminModel = require('../../models/admin')
const UserModel = require('../../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

class AdminController {
    static dashboard = async (req, res) => {
        try {
            res.render('admin/dashboard', { name: req.user.name }) //views (admin ka folder/dashboard.ejs)
        } catch (error) {
            console.log(error)
        }
    }

    static userInsert = async (req, res) => {
        // console.log(req.body);
        const { name, email, password } = req.body;

        // Validate fields
        if (!name || !email || !password) {
            req.flash("error", "All fields are required");
            return res.redirect("/register");
        }

        // Check if email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            req.flash("error", "Email already registered");
            return res.redirect("/register");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save user
        const newUser = UserModel.create({
            name,
            email,
            password: hashedPassword,

        });
        req.flash("success", "user registered successfully");
        return res.redirect("/login");
    }

    // static adminInsert =async(req,res)=>{
    //     try {
    //         // console.log(req.body) //data comes in object format
    //         const {name,email,password} = req.body
    //         const hashpassword = await bcrypt.hash(password,10)
    //         const result = await AdminModel.create({
    //             name,
    //             email,
    //             password:hashpassword
    //         })
    //         res.redirect('/login') //web.js

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    static verifyLogin = async (req, res) => {
        try {
            // console.log(req.body)
            const { email, password } = req.body
            const user = await UserModel.findOne({ email })
            // 
            if (!user) {
                req.flash("error", "You are not Registered User")
                return res.redirect('/login')
            } else {
                const isMacth = await bcrypt.compare(password, user.password)
                if (isMacth) {
                    //token create
                    const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, process.env.Secret_key);
                    // console.log(token)
                    res.cookie("token", token)
                    // return res.redirect("/dashboard")
                    // Role based redirect
                    if (user.role === "admin") {
                        return res.redirect("/dashboard");
                    } else if (user.role === "jobseeker") {
                        return res.redirect("/");
                    } else {
                        // Agar role unknown hai to login page
                        req.flash("error", "Invalid user role");
                        return res.redirect("/login");
                    }
                } else {
                    req.flash("error", "Email or Password not Macth")
                    return res.redirect("/login")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    static logout = async (req, res) => {
        try {
            res.clearCookie("token")
            req.flash("success", "logout successfully")
            return res.redirect('/login')

        } catch (error) {
            console.log(error)
        }
    }




}
module.exports = AdminController

