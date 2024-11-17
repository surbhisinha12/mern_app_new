const { required } = require('joi');
const {signup, login} = require('../Controllers/AuthController');
const {signupValidation} = require('../Middlewares/validation');
const {loginValidation}  = require('../Middlewares/validation');

const router = require('express').Router();
router.post('/login' , loginValidation, login);
router.post('/signup' , signupValidation , signup);
       
    


module.exports = router;