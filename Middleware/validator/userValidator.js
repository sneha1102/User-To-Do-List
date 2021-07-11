const Joi = require( "joi" );

function signUpValidator( req, res, next )
{
	let schema = Joi.object().keys( {
		name: Joi.string().required(),
		email: Joi.string().required(),
		age: Joi.string().required(),
		password: Joi.string().required().length(8),
	} );
	const {error, value} = schema.validate( req.body );
	if ( error ) {
		res.status( 400 ).send( error.details[ 0 ].message );
		return;
	} else {
		req.body = value;
		next();
	}
}

function loginValidator( req, res, next )
{
	let schema = Joi.object().keys( {
		email: Joi.string().required(),
		password: Joi.string().required().length( 8 ),
	} );
	const {error, value} = schema.validate( req.body );
	if ( error ) {
		res.status( 400 ).send( error.details[ 0 ].message );
		return;
	} else {
		req.body = value;
		next();
	}
}

function userDetailValidator( req, res, next )
{
	let schema = Joi.object().keys( {
		email: Joi.string().required(),
		age: Joi.string(),
		name: Joi.string(),
	} );
	const {error, value} = schema.validate( req.body );
	if ( error ) {
		res.status( 400 ).send( error.details[ 0 ].message );
		return;
	} else {
		req.body = value;
		next();
	}
}

module.exports = {
	signUpValidator,
	loginValidator,
	userDetailValidator,
}

