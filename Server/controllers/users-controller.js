const { validationResult } = require('express-validator');
const User = require('../models/users-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const getUsers = async(req, res, next)=>{
    let users;
    try{
        users = await User.find();
    }
    catch(err){
        const error = new Error("Error fetching users from Database");
        error.code = 500;
        return next(error);
    }
    
    res.json(users);
    
};

const signup = async (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error("Invalid Inputs passed, Please check your data!!");
        error.code = 422;
        return next(error);
    }
    const { name, email, password} = req.body;
    let identifiedUser;
    try{
        identifiedUser = await User.find({ email : email});
    }
    catch(err){
        const error = new Error("Error finding if user is an existing user in Database");
        error.code = 500;
        return next(error);
    }
    
    if(identifiedUser.length !== 0){
        const error = new Error("This Email Id is already Registered!! Please use another Email to Signup");
        error.code = 404;
        return next(error);
    }

    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(password, 12);
    }catch(err){
        const error = new Error("Could not Sign up at the moment, please try again!!"); 
        error.code = 500;
        return next(error);
    }
    
    const createdUser = new User({
        name,
        email,
        password : hashedPassword,
    });
    try{
        await createdUser.save();
    }catch(err){
        const error = new Error("User registration Failed!! Please try again");
        error.code = 500;
        return next(error);
    }

    let token;
    try{
        token = jwt.sign(
            {   userId : createdUser._id, email : createdUser.email }, 
            process.env.JWT_KEY, 
            {   expiresIn : '1h' });
    }
    catch(err){
        const error = new Error("User registration Failed!! Please try again");
        error.code = 500;
        return next(error);
    }
    
    res.status(201).json({ user : createdUser._id, email : createdUser.email, token : token ,message : "User created Successfully!!"});
};


const login = async (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error("Invalid Inputs passed, Please check your data!!");
        error.code = 422;
        return next(error);
    }
    const {email, password} = req.body;
    let identifiedUser;
    try{
        identifiedUser = await User.find({ email : email});
    }
    catch(err){
        const error = new Error("Error finding if user is an existing user in Database");
        error.code = 500;
        return next(error);
    }
    [ identifiedUser ] = identifiedUser;
    if(!identifiedUser){
        const error = new Error("This Email is not registered!!");
        error.code  = 401;
        return next(error);
    }

    let isValidPassword = false;
    try{
        isValidPassword = await bcrypt.compare(password, identifiedUser.password);
    }
    catch(err){
        const error = new Error("Could not log you in at the moment, Please try again!!!");
        error.code = 500;
        return next(error);
    }
    if(!isValidPassword){
        const error = new Error("Incorrect Password!!");
        error.code  = 401;
        return next(error);
    }

    let token;
    try{
        token = jwt.sign(
            { userId : identifiedUser._id, email : identifiedUser.email }, 
            process.env.JWT_KEY, 
            {expiresIn : '1h'});
    }
    catch(err){
        const error = new Error("User Login Failed!! Please try again");
        error.code = 500;
        return next(error);
    }
    res.json({ user : identifiedUser._id, email : identifiedUser.email , token : token, message : "Logged In"});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;