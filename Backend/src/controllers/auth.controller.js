const userModel= require("../models/user.model")
const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");
const tokenBlacklistModel = require('../models/blacklist.model');




/**
 * @name registerUser
 * @description register user, expects username ,email,password from req.body
 * @access public
 */

async function registerUserController(req,res) {
    const {username,email,password} = req.body;
        if(!username || !email || !password){
        return res.status(400).json({
            message:"please provide username , email and password"
        })
    }
    const isUserAlreadyExist= await userModel.findOne({email});
     if(isUserAlreadyExist){
        return res.status(400).json({
            message:"account already exist"
        })
    }
    const hash= await bcrypt.hash(password,10);
    const user= await userModel.create({
        username,
        email,
        password:hash
    })
     const token = jwt.sign({
        _id:user._id,
        username:user.username

    },process.env.JWT_SECRET,{
        expiresIn:'1d'
    });
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000
    };
    res.cookie("token", token, cookieOptions);

     return res.status(201).json({
        message:"user register successfully" ,
        user:{
            _id:user._id,
            username:user.username,
            email:user.email
        }
    })
}




/**
 * @name loginUserController
 * @description login user, expects email and password from the req.body
 * @access public
 */
async function loginUserController(req,res){
   
    //    console.log("this is backed login controller")
       const {email,password}= req.body;
       const user= await userModel.findOne({email});

       if(!user){
        return res.status(400).json({
          message:"invalid email, user not found"
        })
       }
       const isPasswordValid=await bcrypt.compare(password,user.password)
      if(!isPasswordValid){
        // console.log("incorrect password");
       return res.status(400).json({
        message:"incorrect password"
       })
    }

    const token = jwt.sign({
        _id:user._id,
        username:user.username

    },process.env.JWT_SECRET,{
        expiresIn:'1d'
    });
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000
    };
    res.cookie("token", token, cookieOptions);
    
    // console.log("__---___",user);
    return res.status(200).json({
        message:"user logged in successfully",
        user:{
            _id:user._id,
            username:user.username,
            email:user.email
        }
    })
      
}



/**
 * @name logoutUserController
 * @description clear token from the client side and add this token to the blacklist for future use 
 * @access Public
 */
async function logoutUserController(req, res) {
    try {
        const token = req.cookies.token;

        if (token) {
            await tokenBlacklistModel.create({ token });
        }

        res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'none' });

        return res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        });
    }
}


/**
 * @name getMeController
 * @description get the current user 
 * @access Private
 */

async function getMeController(req,res) {
    // console.log("auth cpntroller")
       
     const user=await userModel.findById(req.user._id);
    // if(!user){
    //     return res.status(404).json({
    //         message:"user not found"
    //     })
    // }
    // console.log(user,"auth cpntroller")
    const obj= {
        id:user._id,
        username:user.username,
        email:user.email
    }
     return res.status(200).json({
        user
     })
}






module.exports={
    loginUserController,
    registerUserController,
    logoutUserController,
    getMeController
}