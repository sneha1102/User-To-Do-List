const mongoose = require( 'mongoose' )
const taskSchema = new mongoose.Schema( {
	taskName: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	concernedPerson: {
		type: String,
		default: 'NA',
	},
	dueDate: {
		type: Date,
		required: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
},
	{timestamps: true}
);
module.exports = mongoose.model( 'Task', taskSchema )