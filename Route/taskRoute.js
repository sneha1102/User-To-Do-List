const express = require( 'express' );

const addNewTask = require( '../Controller/taskController' );
const deleteTask = require( '../Controller/taskController' );
const getTaskById = require( '../Controller/taskController' );
const getAllTask = require( '../Controller/taskController' );
const getCompletedTask = require( '../Controller/taskController' );
const updateTask = require( '../Controller/taskController' );
const addtaskValidator = require( '../Middleware/validator/taskValidator' );
const updatetaskValidator = require( '../Middleware/validator/taskValidator' );
const auth = require( '../Middleware/auth' );

const taskRouter = express.Router();

taskRouter.post( '/task', auth, addtaskValidator.addtaskValidator, addNewTask.addNewTask );
taskRouter.get( '/task', auth, getAllTask.getAllTask );
taskRouter.get( '/task/status', auth, getCompletedTask.getCompletedTask );
taskRouter.put( '/task/:id', auth, updatetaskValidator.updatetaskValidator, updateTask.updateTask );
taskRouter.delete( '/task/:id', auth, deleteTask.deleteTask );
taskRouter.get( '/task/:id', auth, getTaskById.getTaskById );

module.exports = taskRouter;