const Task = require( '../Model/taskModel' );

// Add new task
async function addNewTask ( req, res )
{
	const task = new Task( {
		description: req.body.description,
		completed: req.body?.completed || false,
		concernedPerson: req.body?.concernedPerson || 'NA',
		taskName: req.body.taskName,
		dueDate: req.body.dueDate,
	} );
	try {
		const newTask = await task.save();
		res.status( 200 ).json(newTask);
	}
	catch(err) {
		res.status( 400 ).json( {'error': err} );
	}
}

// Update task
async function updateTask(req, res )
{
	try {
		const task = await Task.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true} );
		res.status( 200 ).json( task );
	}
	catch ( err ) {
		res.status( 400 ).json( {'error': err} );
	}
}

// Delete task
async function deleteTask ( req, res )
{
	try {
		const id = req.params.id;
		const deletedTask = await Task.findByIdAndDelete(id);
		res.status( 200 ).json( deletedTask );
	}
	catch ( err ) {
		res.status( 400 ).json( {'error': err} );
	}
}

// Get task by id
async function getTaskById ( req, res )
{
	try {
		const task = await Task.findOne( {_id: req.params.id} );
		if ( !task ) {
			res.status( 404 ).json( 'Task not found' );
		}
		res.status( 200 ).json( task );
	}
	catch ( err ) {
		res.status( 400 ).json( {'error': err} );
	}
}

// Get all tasks
async function getAllTask ( req, res )
{
	try {
		const tasks = await Task.find( {} );
		if ( !tasks ) {
			res.status( 404 ).json( 'Task not found' );
		}
		res.status( 200 ).json( tasks );
	}
	catch ( err ) {
		res.status( 400 ).json( {'error': err} );
	}
}

// Get completed tasks
async function getCompletedTask ( req, res )
{
	try {
		const tasks = await Task.find( {completed: req.query.completed} );
		if ( !tasks ) {
			res.status( 404 ).json( 'No task is completed yet' );
		}
		res.status( 200 ).json( tasks );
	}
	catch ( err ) {
		res.status( 400 ).json( {'error': err} );
	}
}

module.exports = {
	addNewTask,
	updateTask,
	deleteTask,
	getTaskById,
	getAllTask,
	getCompletedTask,
}