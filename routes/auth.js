const express = require('express');
const {body} = require('express-validator/check');
const router = express.Router();

const User = require('../models/user');
const authControlller = require('../controllers/auth');

router.put('/signup',[
    body('email')
        .isEmail()
        .withMessage('entrez un e-mail valid')
        .custom((value, {req}) => {
            return User.findOne({email: value}).then(userDoc => {
                if(userDoc){
                    return Promise.reject('E-mail adress already exist !');
                }
            })
        })
        .normalizeEmail(),
    body('password').trim().isLength({min: 5}),
    body('name')
        .trim()
        .not()
        .isEmpty()
],
    authControlller.signup
)

router.post('/login', authControlller.login);

module.exports = router;
