const Joi = require( "joi" );

function addtaskValidator( req, res, next )
{
	let schema = Joi.object().keys( {
		description: Joi.string().required(),
		completed: Joi.boolean(),
		taskName: Joi.string().required(),
		dueDate: Joi.date().required(),
		concernedPerson: Joi.string(),
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

function updatetaskValidator( req, res, next )
{
	let schema = Joi.object().keys( {
		description: Joi.string(),
		completed: Joi.boolean(),
		taskName: Joi.string(),
		dueDate: Joi.date(),
		concernedPerson: Joi.string(),
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
	addtaskValidator,
	updatetaskValidator,
}
