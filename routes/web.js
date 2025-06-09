const express = require('express')
const FrontController = require('../controllers/FrontController')
const AdminController = require('../controllers/admin/AdminController')
const CategoryController = require('../controllers/admin/CategoryController')
const JobController = require('../controllers/admin/JobController')
const route =express.Router()
const checkAuth = require('../middleware/auth')
const ContactController = require('../controllers/admin/ContactController')


route.get('/',FrontController.home)
route.get('/about',FrontController.about)
route.get('/course',FrontController.course)
route.get('/contact',FrontController.contact)
route.get('/login',FrontController.login)
route.get('/register',FrontController.register)
route.get('/joblist',FrontController.joblist)
route.get('/jobdetails/:id', FrontController.jobDetails)

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



//categoryController
route.get('/job/display',checkAuth,JobController.display)
route.post('/insertJob',checkAuth,JobController.insertJob)
// http://localhost:3000/category/display


//contactController
route.post('/contactInsert',ContactController.contactInsert)






module.exports =route