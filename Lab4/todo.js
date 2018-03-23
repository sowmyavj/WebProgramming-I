const mongoCollections = require("./mongoCollections");
const todo = mongoCollections.todoItems;
const uuidv4 = require('uuid/v4');


module.exports = {
	async createTask(title, description){
		if (!title) throw "You must provide a title for the task";

		if (!description) throw "You must provide a description for the task";
		
		var uniqueID = uuidv4();
		const todoItems = await todo();
		
		let newTask = {
			  _id: uniqueID,
			  title: title,
			  description: description,
			  completed: false,
			  completedAt: null
			};
		
	    const insertInfo = await todoItems.insertOne(newTask);
		if (insertInfo.insertedCount === 0) throw "Could not add task";
		
		const newId = insertInfo.insertedId;
		const task = await this.getTask(newId);
		return task;
	},

	async getTask(id){
		if(!id) throw "You must provide an id to search for a task";

		const taskCollection = await todo();
		const task = await taskCollection.findOne({ _id: id });
		if (task === null) throw "No task with that id";
	
		return task;
	},

	async getAllTasks(){
		const taskCollection = await todo();
	    const tasks = await taskCollection.find({}).toArray();
		return tasks;
	},

	async removeTask(id){
		if (!id) throw "You must provide an id to search for";
		
		const taskCollection = await todo();
		const deletionInfo = await taskCollection.removeOne({ _id: id });
		
		if (deletionInfo.deletedCount === 0) {
			  throw `Could not delete dog with id of ${id}`;
		}
	},
	async completeTask(taskId){
		if(!taskId) throw "You must provide an id to search";
		const taskCollection = await todo();
		const task = await taskCollection.findOne({ _id: taskId });
		if (task === null) throw "No task with that id";

		const updatedTask = {
			title: task.title,
			description: task.description,
			completed: true,
			completedAt: new Date()
		};
	
		const updatedInfo = await taskCollection.updateOne({ _id: taskId }, updatedTask);
		if (updatedInfo.modifiedCount === 0) {
		  throw "could not update dog successfully";
		}else{
			console.log("\nTask updated successfuly to completed.")
		}

		return await this.getTask(taskId);
	},
		
};