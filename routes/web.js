const express = require('express')
const FrontController = require('../controllers/FrontController')
const route =express.Router()


route.get('/',FrontController.home)
route.get('/about',FrontController.about)
route.get('/course',FrontController.course)
route.get('/contact',FrontController.contact)
route.get('/login',FrontController.login)
route.get('/register',FrontController.register)






module.exports =route