const userSchema = require("../Model/UserModel");
const bcrypt =require('bcrypt');
const saltround = 10;

const registerUser  = async (req,res)=>{
    try{
        const {email,password} = req.body

        const user = await userSchema.findOne({email})

        if(user) {
              return res.render('user/login',{message : 'User already exist , Please login  !'}) 
        }
        else {
        
        const hassedPassword = await bcrypt.hash(password,saltround);

        const newUser = new userSchema({
            email,
            password:hassedPassword
        })

        await newUser.save()

        res.redirect("/user/login");
    }
    }
    catch(err){
        console.error("Error registering user:", err);

        res.render("user/register", { message: "An error occurred during registration" });
    }
}

const loginUser = async (req,res)=>{
    try{


        const {email,password} = req.body

        const user = await userSchema.findOne({email})

        if(!user){
            return res.render('user/login',{message:'User does not exists'})
        }
        else{
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){ 
                return res.render('user/login',{message:'Incorrect password'})
            }
            else{
                req.session.user =true
                res.redirect('/user/home')
            } 
        }
    }
    catch(err){
        console.error("Error Login user:", err);

        res.render("user/login", { message: "An error occurred during Login" });
    }
}

const loadRegister = (req,res)=>{
    res.render('user/register')
}
const loadLogin = (req,res)=>{
    res.render('user/login')
}

const loadHome = (req, res) => {
        res.render('user/home'); 
};

const logout = (req,res)=>{
    req.session.destroy();

    res.redirect('/user/login')
}

module.exports = {registerUser,loadRegister,loadLogin,loginUser,loadHome ,logout}