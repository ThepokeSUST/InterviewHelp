const express=require("express");
const route= express.Router();
const {loginUserController,logoutUserController,getMeController,registerUserController} = require("../controllers/auth.controller")
const {authUser}= require("../middlewares/auth.middleware")



/**
 * @route POST  api/auth/register
 * @description register user with using username , email and password
 * @access public
 */
route.post('/register',registerUserController)

/**
 * @route POST  api/auth/login
 * @description login user with using email and password
 * @access public
 */
route.post('/login',loginUserController)


/**
 * @route GET  api/auth/logout
 * @description logout user by clearing the cookie
 * @access public   
 */
route.get("/logout", logoutUserController);


/**
 * @route GET api/auth/me
 * @description fetch current logged in user using req.user._id
 * @access private
 */
route.get("/me", authUser, getMeController);


module.exports=route;