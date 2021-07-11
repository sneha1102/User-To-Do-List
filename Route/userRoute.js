const express = require( 'express' );

const signup = require( '../Controller/userController' );
const login = require( '../Controller/userController' );
const updateUserDetail = require( '../Controller/userController' );
const signUpValidator = require( '../Middleware/validator/userValidator' );
const loginValidator = require( '../Middleware/validator/userValidator' );
const userDetailValidator = require( '../Middleware/validator/userValidator' );
const auth = require( '../Middleware/auth' );

const userRouter = express.Router();

userRouter.post( '/signup', signUpValidator.signUpValidator, signup.signup );
userRouter.post( '/login', auth, loginValidator.loginValidator, login.login );
userRouter.put( '/me', auth, userDetailValidator.userDetailValidator, updateUserDetail.updateUserDetail );

module.exports = userRouter;