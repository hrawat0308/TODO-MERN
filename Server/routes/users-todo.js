const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userTodoController = require('../controllers/users-todo-controller');
const jwt = require('jsonwebtoken');

router.use((req, res, next)=>{
    if(req.method === 'OPTIONS'){
        return next();
    }
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            throw new Error("Authentication Failed");
        }
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = {userId : decodedToken.userId}
        next();
    }
    catch(err){
        const error = new Error("Authentication Failed!!");
        error.code = 401;
        return next(error);
    }
    
});


router.get('/:userId/todo', userTodoController.getTodoByUserId);


router.post('/:userId/add-todo',
    [
        body('todo').trim().not().isEmpty().isLength({max:50}),
    ], 
    userTodoController.createTodo);

router.delete('/:todoId/delete-todo', userTodoController.deleteTodo);

module.exports = router;