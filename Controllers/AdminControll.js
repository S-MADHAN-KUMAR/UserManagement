const AdminModel = require("../Model/AdminModel");
const userSchema = require('../Model/UserModel')
const bcrypt = require("bcrypt");
const UserModel = require("../Model/UserModel");
const { removeAllListeners } = require("nodemon");

const loadLogin = (req,res)=>{
    res.render('admin/login')
}
const adminLogin = async (req,res)=>{
   try{
    const {email,password} = req.body;

    const admin = await AdminModel.findOne({email})

   if(!admin) return res.render('admin/login',{message : "Ivalid Credentials"})

    const isMatch = await bcrypt.compare(password,admin.password)

    if(!isMatch) return res.render("admin/login",{message:"Invalid Credentials"})

    req.session.admin = true;

    const users =await UserModel.find({})

    res.redirect('/admin/dashboard')


   }
   catch(err){
    res.send(err)
    console.log(err)
   }
}

const loadDasboard = async (req,res)=>{

    try{
        if (!req.session.admin) return res.redirect('/admin/login')

        const users =await UserModel.find({})

       res.render('admin/dashboard',{users});
    }
  catch(err){
    res.send(err)
    console.log(err)
  }
}

const editUser = async (req,res)=>{
  try{
    const { id, email, password } = req.body;

    const hassedPassword = await bcrypt.hash(password,10)

    await UserModel.findByIdAndUpdate({_id:id},{email,password:hassedPassword})
    
    res.redirect('/admin/dashboard');

  }
  catch(err){
    res.send(err)
    console.log(err)
  }
}

const deleteUser = async (req,res)=>{
  try{
    const {id} = req.params
    await UserModel.findOneAndDelete({_id:id})

    res.redirect('/admin/dashboard')
  }
  catch(err){
   console.log(err)
  }
}

const addUser = async(req,res)=>{
  try{


    const {email,password}=req.body

    const hassedPassword = await bcrypt.hash(password,10)

    const newUser = new UserModel({
      email,
      password:hassedPassword
    })


    await newUser.save()

    res.redirect("/admin/dashboard")
  }
  catch(err){
    console.log(err)
  }
}

const logout = async(req,res)=>{
  req.session.destroy()
  res.redirect('/admin/login')
}

const searchUser = async (req, res) => {
  try {
    const { searchEmail } = req.body;

    console.log(req.body)

 
    const trimmedEmail = searchEmail.trim();

    console.log(trimmedEmail);

    const user = await userSchema.find({ email: trimmedEmail });

    console.log(user);

    if (user) {
      res.render('admin/dashboard', { users: user });
    } else {
      res.redirect('/admin/dashboard');
    }
  } catch (err) {
    console.log(err);
  }
};


module.exports = {loadLogin,adminLogin,loadDasboard,editUser,deleteUser,addUser,logout,searchUser}