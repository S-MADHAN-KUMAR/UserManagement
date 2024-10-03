const express = require("express")
const app = express()
const hbs = require('hbs')
const userRoute = require('./Routes/UserRouters')
const adminRoute = require('./Routes/AdminRouters')
const connectDB = require("./db/connectDB")
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
const session = require("express-session");
const nocache = require('nocache')

// Middle ware
app.use(express.static('public'));
app.set('view engine' , 'hbs')
app.use(nocache());

app.use(session(
  {
    secret:"mysecretkey",
    resave:false,
    saveUninitialized:true,
  }))

app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use("/user",userRoute)
app.use('/admin',adminRoute)


connectDB()

app.listen(3000,()=>{
  console.log("......................Server starting on 3000 ...................")
})