const express = require('express') 
const Router = express.Router();
const userController = require("../Controllers/UserControlls")
const Auth = require("../middleware/auth")
Router.use(express.urlencoded({extended:true}));

Router.get('/register',Auth.isLogin,userController.loadRegister)

Router.get('/login',Auth.isLogin,userController.loadLogin)

Router.post('/register',userController.registerUser)

Router.post('/login',Auth.isLogin,userController.loginUser)

Router.get('/home',Auth.checkSession,userController.loadHome)

Router.get('/logout',userController.logout)



module.exports = Router
