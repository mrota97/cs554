import * as mongodb from "mongodb";
const mongoCollections = require("../config/mongoCollections");
const taskCollection = mongoCollections.tasks;
const uuid = require("node-uuid");

interface Task {
	_id: string,
	title:string,
	description:string,
	hoursEstimated:number,
	completed:boolean,
	comments:comment[]
}

interface comment {
	_id:string,
	name:string,
	comment:string
}

const exportedMethods = {
	async getTasks(s: string, t: string): Promise<Array<Task>> {
		if (!s) { var skip: number = 0 } else { var skip: number = parseInt(s) } 
		if (!t) { var take: number = 20 } else { var take: number = Math.min(parseInt(t), 100) }

		const taskCollection = await tasks();
		return await taskCollection.find().limit(take).skip(skip).toArray();
	},
	async getTaskById(id: string): Promise<Task> {
		if (!id) throw "You must provide an id";
		const taskCollection = await tasks();
		const task = await taskCollection.findOne( { _id: id });

		if (!task) throw "Task not found";
		return task;
	},
	async addTask(title: string, description: string, hoursEstimated: number, completed: boolean, comments: comment[]) {
		if (typeof title !== "string" || title == "") throw "Please provide a valid title";
		if (typeof description !== "string" || description == "") throw "Please provide a valid description";		
		if (typeof hoursEstimated !== "number" || hoursEstimated < 0) throw "Please provide a valid time (in hours)";
		if (typeof completed !== "boolean") throw "Completed must be true or false";
		// if (!comments instanceof Array) throw "Please provide a valid steps list";
		try {
			
			const taskCollection = await tasks();

			let newTask: Task = {
				_id: uuid.v4(),
				title: title,
				description: description,
				hoursEstimated: hoursEstimated,
				completed: completed,
				comments: comments
			};

			const insert = await taskCollection.insertOne(newTask);
			if (insert.insertedCount != 1) throw "The task could not be added.";
			const newId = insert.insertedId;

		} catch (e) {}
	},
	async replaceTask(id: string, title: string, description: string, hoursEstimated: number, completed: boolean, comments: comment[]): Promise<Task> {
		if (typeof title !== "string" || title == "") throw "Please provide a valid title";
		if (typeof description !== "string" || description == "") throw "Please provide a valid description";		
		if (typeof hoursEstimated !== "number" || hoursEstimated < 0) throw "Please provide a valid time (in hours)";
		if (typeof completed !== "boolean") throw "Completed must be true or false";
		// if (!comments instanceof Array) throw "Please provide a valid steps list";

		try{
			const taskCollection = await tasks();
			
			let freshTask = {
				title: title,
				description: description,
				hoursEstimated: hoursEstimated,
				completed: completed,
				comments: comments
			};

			const replace = await taskCollection.findOneAndUpdate({ _id: id}, {$set: freshTask});
			if (replace.value == null) throw "A task with that id could not be found in the database.";
			
			return await this.getTaskById(id);		
		} catch (e) {}
	},
	async updateTask(id: string, info: Task): Promise<Task> {
		if (!id) throw "You must provide a valid id";
		if (typeof info !== "object") throw "Please specify what you would like to update.";
		try {
			const taskCollection = await tasks();
			let freshTask: Task = {
				_id: '',
				title: '',
				description: '',
				hoursEstimated: 0,
				completed: false,
				comments: []
			};

			if (info.title) freshTask.title = info.title;
			if (info.description) freshTask.description = info.description;
			if (info.hoursEstimated) freshTask.hoursEstimated = info.hoursEstimated;
			if (info.completed) freshTask.completed = info.completed;

			const updated = await taskCollection.findOneAndUpdate({ _id: id}, { $set: freshTask });
			if (updated.value == null) throw "A task with that id could not be found in the database.";
			
			return await this.getTaskById(id);
		} catch (e) {}
	},
	async addComment(id: String, name: String, comment: Comment): Promise<Task> {
		if (!id) throw "Please provide a valid task ID";
		if (typeof name !== "string" || name == "") throw "Please provide a valid comment name";
		if (typeof comment !== "string" || comment == "") throw "Please provide a valid comment body";

		try {
			const taskCollection = await tasks();

			let newComment: comment = {
				_id: uuid.v4(),
				name: name,
				comment: comment
			};

			const insert = taskCollection.updateOne({ _id: id }, { $push: { comments: newComment } });
			// if (insert.value == null) throw "A task with that id could not be found in the database.";

			return await this.getTaskById(id);
		} catch (e) {}
	},
	async deleteComment(taskId: String, commentId: String): Promise<Task> {
		if (!taskId) throw "Please provide a valid task ID";
		if (!commentId) throw "Please provide a valid comment ID";

		try {
			const taskCollection = await tasks();

			const remove = taskCollection.updateOne({ _id: taskId}, { $pull: { comments: { _id: commentId }}});
			// if (remove.value == null) throw "A task with that id could not be found in the database.";

			return await this.getTaskById(taskId);
		} catch (e) {}
	}
}

module.exports = exportedMethods;