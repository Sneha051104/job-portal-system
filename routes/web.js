const express = require('express')
const FrontController = require('../controllers/FrontController')
const AdminController = require('../controllers/admin/AdminController')
const CategoryController = require('../controllers/admin/CategoryController')
const JobController = require('../controllers/admin/JobController')
const route =express.Router()
const checkAuth = require('../middleware/auth')
const uploadResume = require('../middleware/uploadResume')
const ContactController = require('../controllers/admin/ContactController')
const JobModel =require('../models/job')


route.get('/',FrontController.home)
route.get('/about',FrontController.about)
route.get('/course',FrontController.course)
route.get('/contact',FrontController.contact)
route.get('/login',FrontController.login)
route.get('/register',FrontController.register)
route.get('/joblist',FrontController.joblist)
route.get('/jobdetails/:id', FrontController.jobDetails)
route.post('/job/apply/:id',uploadResume.single('resume'),FrontController.jobApply)

//AdminController
route.get('/dashboard',checkAuth,AdminController.dashboard)
route.post('/adminInsert',AdminController.userInsert)
route.post('/verifyLogin',AdminController.verifyLogin)
route.get('/logout',AdminController.logout)



//categoryController
route.get('/category/display',checkAuth, CategoryController.display)
route.post('/insertCategory',checkAuth, CategoryController.insertCategory)
route.get('/deleteCategory/:id',checkAuth, CategoryController.deleteCategory)
route.get('/viewCategory/:id',checkAuth,CategoryController.viewCategory)
route.get('/editCategory/:id',checkAuth,CategoryController.editCategory)
route.post('/UpdateCategory/:id',checkAuth,CategoryController.UpdateCategory)
// http://localhost:3000/category/display



//JobController
route.get('/job/display',checkAuth,JobController.display)
route.post('/insertJob',checkAuth,JobController.insertJob)
route.get('/deletejob/:id', checkAuth, JobController.deletejob)
route.get('/editjob/:id', checkAuth, JobController.editjob)
route.get('/viewjob/:id', checkAuth, JobController.viewjob)
route.post('/updatejob', checkAuth, JobController.updatejob )
route.get('/myapplications',checkAuth,JobController.myApplication)
route.get('/applicants',checkAuth,JobController.viewAllJobs)
route.post("/admin/application/:id/status", checkAuth, JobController.updateApplicationStatus);
// http://localhost:3000/category/display


//contactController
route.post('/contactInsert',ContactController.contactInsert)

//forgetPassword
route.get('/forgetPassword',AdminController.forgetPassword)
route.post('/forgot-password',AdminController.forgotpassword1)

// Reset password
route.get('/reset-password/:token', AdminController.resetPasswordForm);
route.post('/reset-password/:token', AdminController.resetPassword);

//change password
route.get('/changePassword',checkAuth,AdminController.changePassword);
route.post('/changePassword1',checkAuth,AdminController.changepasswordUpdate)


module.exports =route