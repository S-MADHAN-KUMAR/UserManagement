const express = require('express') 
const Router = express.Router();
const adminController = require("../Controllers/AdminControll")
const adminAuth = require("../middleware/adminAuth")

Router.get('/login',adminAuth.isLogin,adminController.loadLogin)
Router.post('/login',adminController.adminLogin)
Router.get("/dashboard",adminAuth.checkSession,adminController.loadDasboard)
Router.post('/edit-user',adminAuth.checkSession,adminController.editUser)
Router.post('/add-user',adminAuth.checkSession,adminController.addUser)
Router.get('/delete-user/:id',adminAuth.checkSession,adminController.deleteUser)
Router.get('/logout',adminAuth.checkSession,adminController.logout)
module.exports = Router
