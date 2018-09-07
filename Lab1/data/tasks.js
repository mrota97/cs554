const mongoCollections = require("../config/mongoCollections");
const tasks = mongoCollections.tasks;
const uuid = require("node-uuid");

const exportedMethods = {
	async getTasks(s, t) {
		if (!s) { var skip = 0 } else { var skip = parseInt(s) } 
		if (!t) { var take = 20 } else { var take = Math.min(parseInt(t), 100) }

		const taskCollection = await tasks();
		return await taskCollection.find().limit(take).skip(skip).toArray();
	},
	async getTaskById(id) {
		if (!id) throw "You must provide an id";
		const taskCollection = await tasks();
		const task = await taskCollection.findOne( { _id: id });

		if (!task) throw "Task not found";
		return task;
	},
	async addTask(title, description, hoursEstimated, completed, comments) {
		if (typeof title !== "string" || title == "") throw "Please provide a valid title";
		if (typeof description !== "string" || description == "") throw "Please provide a valid description";		
		if (typeof hoursEstimated !== "number" || hoursEstimated < 0) throw "Please provide a valid time (in hours)";
		if (typeof completed !== "boolean") throw "Completed must be true or false";
		if (!comments instanceof Array) throw "Please provide a valid steps list";

		try {
			
			const taskCollection = await tasks();

			let newTask = {
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
	async replaceTask(id, title, description, hoursEstimated, completed, comments) {
		if (typeof title !== "string" || title == "") throw "Please provide a valid title";
		if (typeof description !== "string" || description == "") throw "Please provide a valid description";		
		if (typeof hoursEstimated !== "number" || hoursEstimated < 0) throw "Please provide a valid time (in hours)";
		if (typeof completed !== "boolean") throw "Completed must be true or false";
		if (!comments instanceof Array) throw "Please provide a valid steps list";

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
	async updateTask(id, info) {
		if (!id) throw "You must provide a valid id";
		if (typeof info !== "object") throw "Please specify what you would like to update.";
		try {
			const taskCollection = await tasks();
			let freshTask = {};

			if (info.title) freshTask.title = info.title;
			if (info.description) freshTask.description = info.description;
			if (info.hoursEstimated) freshTask.hoursEstimated = info.hoursEstimated;
			if (info.completed) freshTask.completed = info.completed;
			if (info.comments) freshTask.comments = info.comments;

			const updated = await taskCollection.findOneAndUpdate({ _id: id}, { $set: freshTask });
			if (updated.value == null) throw "A task with that id could not be found in the database.";
			
			return await this.getTaskById(id);
		} catch (e) {}
	},
	async addComment(id, name, comment) {
		if (!id) throw "Please provide a valid task ID";
		if (typeof name !== "string" || name == "") throw "Please provide a valid comment name";
		if (typeof comment !== "string" || comment == "") throw "Please provide a valid comment body";

		try {
			const taskCollection = await tasks();

			let newComment = {
				_id: uuid.v4(),
				name: name,
				comment: comment
			};

			const insert = taskCollection.updateOne({ _id: id }, { $push: { comments: newComment } });
			// if (insert.value == null) throw "A task with that id could not be found in the database.";

			return await this.getTaskById(id);
		} catch (e) {}
	},
	async deleteComment(taskId, commentId) {
		if (!taskId) throw "Please provide a valid task ID";
		if (!commentId) throw "Please provide a valid comment ID";

		try {
			const taskCollection = await tasks();

			const remove = taskCollection.updateOne({ _id: taskId}, { $pull: { comments: { _id: commentId }}});
			// if (remove.value == null) throw "A task with that id could not be found in the database.";

			return await this.getTaskById(id);
		} catch (e) {}
	}
}

module.exports = exportedMethods;