const CategoryModel = require('../models/category')
const job = require('../models/job')
const JobModel = require('../models/job')
class FrontController{

    static home =async(req,res)=>{
        try {
            const categories = await CategoryModel.find().sort({ createdAt: -1 });//fetching category
            const jobs = await JobModel.find().sort({ createdAt: -1 });//fetching jobs
            // console.log(categories)
            // console.log(jobs)
            res.render('home',{c:categories,jobs:jobs})
        } catch (error) {
            console.log(error)
        }
    }
    static about =async(req,res)=>{
        try {
            res.render('about')
        } catch (error) {
            console.log(error)
        }
    }
    static course =async(req,res)=>{
        try {
            res.send('course page')
        } catch (error) {
            console.log(error)
        }
    }
    static contact =async(req,res)=>{
        try {
            const success = req.flash('success');
            res.render('contact',{success})
        } catch (error) {
            console.log(error)
        }
    }
    static login =async(req,res)=>{
        try {
            res.render('login',{msg:req.flash("error"),success:req.flash("success")})
        } catch (error) {
            console.log(error)
        }
    }

    static register =async(req,res)=>{
        try {
            res.render('register')
        } catch (error) {
            console.log(error)
        }
    }
    
    static joblist =async(req,res)=>{
        try {
            const jobs = await JobModel.find().sort({ createdAt: -1 });//fetching jobs
            res.render('joblist',{jobs})
        } catch (error) {
            console.log(error)
        }
    }
    static jobDetails =async(req,res)=>{
        try {
            const id = req.params.id
            const job = await JobModel.findById(id) 
            // console.log(job)
            res.render('jobdetail',{job})
        } catch (error) {
            console.log(error)
        }
    }


}
module.exports =FrontController