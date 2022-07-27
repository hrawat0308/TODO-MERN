const { validationResult } = require('express-validator');
const Todo = require('../models/todo-model');
const User = require('../models/users-model');

 
const getTodoByUserId = async(req, res, next)=>{
    if(req.userData.userId !== req.params.userId){
        const error = new Error("You are not allowed to access tasks of other user");
        error.code = 401;
        return next(error);
    }
    const userId = req.params.userId;
    let identifiedUser;
    try{
        identifiedUser = await User.findById(userId);
     }
     catch(err){
         const error = new Error("No user found!!");
         error.code = 500;
         return next(error);
    }

    if(!identifiedUser){
        const error = new Error("User with this User Id not found in Database");
        error.code = 500;
        return next(error);
    }
    
    let usersTodo;
    try{
        usersTodo = await Todo.find({ user : userId });
    }
    catch(err){
        const error = new Error("Error fetching the task by this user!!");
        error.code = 500;
        return next(error);
    }

    if(!usersTodo){
        const error = new Error("Add Some Tasks");
        error.code = 404;
        return next(error);
    }

    res.json({ usersTodo });
}

const createTodo = async (req, res, next)=>{
    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        const error = new Error("Invalid Inputs passed, Please check your data!!");
        error.code = 422;
        return next(error);
    }
    let identifiedUser;
    const user = req.params.userId;

    if(req.userData.userId !== req.params.userId){
        const error = new Error("You are not allowed to add tasks for other users");
        error.code = 401;
        return next(error);
    }

    let {todo} = req.body;
    try{
       identifiedUser = await User.findById(user);
    }
    catch(err){
        const error = new Error("Error finding user");
        error.code = 500;
        return next(error);
    }

    if(!identifiedUser){
        const error = new Error("User with this User Id not found in Database");
        error.code = 500;
        return next(error);
    }
    
    const createdTodo = new Todo({
        todo,
        user,
    });

    try{
        await createdTodo.save();
    }
    catch(err){
        const error = new Error("Adding Task to Database Failed!! Please try again");
        error.code = 500;
        return next(error);
    }

    res.status(201).json(createdTodo);
}

const deleteTodo = async (req, res, next)=>{
    const todoId = req.params.todoId;

    let identifiedTodo;
    try{
        identifiedTodo = await Todo.findById(todoId);
     }
     catch(err){
         const error = new Error("Error Fetching Todo!!");
         error.code = 500;
         return next(error);
    }

    if(!identifiedTodo){
        const error = new Error("No Todo Found!!");
        error.code = 500;
        return next(error);
    }


    if(req.userData.userId !== identifiedTodo.user.valueOf()){
        const error = new Error("You are not allowed to delete tasks of other user");
        error.code = 401;
        return next(error);
    }

    try{
        await Todo.deleteOne({_id : todoId});
    }
    catch(err){
        const error = new Error("Error Deleting Todo from Database");
        error.code = 500;
        return next(error);
    }
    res.status(200).json({ message : "deleted Todo"});
}
exports.getTodoByUserId = getTodoByUserId;
exports.createTodo = createTodo;
exports.deleteTodo = deleteTodo;