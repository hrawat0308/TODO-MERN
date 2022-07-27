const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controller');
const { body } = require('express-validator');

router.get('/users', usersController.getUsers);

router.post('/signup', 
    [   body('name').trim().not().isEmpty(),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({min : 6})

    ],
    usersController.signup);

router.post('/login',   
    [
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min : 6})
    ], 
    usersController.login);

module.exports = router;
