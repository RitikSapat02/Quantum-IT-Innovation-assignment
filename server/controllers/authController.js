const User = require('../models/user');
const {hashPassword, comparePassword} = require("../helpers/auth");
const jwt = require('jsonwebtoken');

const test = (req,res) =>{
    res.json('test is working');
}

//Register controller
const registerUser =async (req,res)=>{
    try{
        const { name,dob, email, password } = req.body;
        //check name
        if(!name){
            return res.json({
                error:'name is required'
            })
        };
        //check password
        if(!password || password.length < 6){
            return res.json({
                error:'password is required and shoudl be atleast 6 characters long'
            })
        };
        //check email
        const exist = await User.findOne({email});

        if(exist){
            return res.json({
                error:'Email is taken already'
            })
        };

        const hashedPassword = await hashPassword(password);

        //create User in Database
        const user = await User.create({
            name,
            dob,
            email,
            password:hashedPassword,
        })
        jwt.sign({email:user.email,dob:user.dob, id:user._id,name:user.name}, process.env.JWT_SECRET,{},(err,token)=>{
            if(err)throw err;
            res.cookie('token',token).json(user)
        })
    }catch(err){
        console.log(err);
    }
}


//Login controller
const loginUser =async (req,res)=>{
    try{
        const { email, password } = req.body;
       
        //check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                error:"No User Found"
            })
        }

        //check passwords match
        const match = await comparePassword(password,user.password);

        if(match){
            jwt.sign({email:user.email,dob:user.dob,id:user._id,name:user.name}, process.env.JWT_SECRET,{},(err,token)=>{
                if(err)throw err;
                res.cookie('token',token).json(user)
            })
        }

        if(!match){
            return res.json({
                error:"Passwords do not match"
            })
        }
    }catch(err){
        console.log(err);
    }
}


module.exports = {
    test,
    registerUser,
    loginUser,
   
}