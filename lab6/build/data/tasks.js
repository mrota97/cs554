var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoCollections = require("../config/mongoCollections");
const tasks = mongoCollections.tasks;
const uuid = require("node-uuid");
const exportedMethods = {
    getTasks(s, t) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!s) {
                var skip = 0;
            }
            else {
                var skip = parseInt(s);
            }
            if (!t) {
                var take = 20;
            }
            else {
                var take = Math.min(parseInt(t), 100);
            }
            const taskCollection = yield tasks();
            return yield taskCollection.find().limit(take).skip(skip).toArray();
        });
    },
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw "You must provide an id";
            const taskCollection = yield tasks();
            const task = yield taskCollection.findOne({ _id: id });
            if (!task)
                throw "Task not found";
            return task;
        });
    },
    addTask(title, description, hoursEstimated, completed, comments) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof title !== "string" || title == "")
                throw "Please provide a valid title";
            if (typeof description !== "string" || description == "")
                throw "Please provide a valid description";
            if (typeof hoursEstimated !== "number" || hoursEstimated < 0)
                throw "Please provide a valid time (in hours)";
            if (typeof completed !== "boolean")
                throw "Completed must be true or false";
            if (!comments instanceof Array)
                throw "Please provide a valid steps list";
            try {
                const taskCollection = yield tasks();
                let newTask = {
                    _id: uuid.v4(),
                    title: title,
                    description: description,
                    hoursEstimated: hoursEstimated,
                    completed: completed,
                    comments: comments
                };
                const insert = yield taskCollection.insertOne(newTask);
                if (insert.insertedCount != 1)
                    throw "The task could not be added.";
                const newId = insert.insertedId;
            }
            catch (e) { }
        });
    },
    replaceTask(id, title, description, hoursEstimated, completed) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof title !== "string" || title == "")
                throw "Please provide a valid title";
            if (typeof description !== "string" || description == "")
                throw "Please provide a valid description";
            if (typeof hoursEstimated !== "number" || hoursEstimated < 0)
                throw "Please provide a valid time (in hours)";
            if (typeof completed !== "boolean")
                throw "Completed must be true or false";
            if (!comments instanceof Array)
                throw "Please provide a valid steps list";
            try {
                const taskCollection = yield tasks();
                let freshTask = {
                    title: title,
                    description: description,
                    hoursEstimated: hoursEstimated,
                    completed: completed,
                    comments: comments
                };
                const replace = yield taskCollection.findOneAndUpdate({ _id: id }, { $set: freshTask });
                if (replace.value == null)
                    throw "A task with that id could not be found in the database.";
                return yield this.getTaskById(id);
            }
            catch (e) { }
        });
    },
    updateTask(id, info) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw "You must provide a valid id";
            if (typeof info !== "object")
                throw "Please specify what you would like to update.";
            try {
                const taskCollection = yield tasks();
                let freshTask = {};
                if (info.title)
                    freshTask.title = info.title;
                if (info.description)
                    freshTask.description = info.description;
                if (info.hoursEstimated)
                    freshTask.hoursEstimated = info.hoursEstimated;
                if (info.completed)
                    freshTask.completed = info.completed;
                const updated = yield taskCollection.findOneAndUpdate({ _id: id }, { $set: freshTask });
                if (updated.value == null)
                    throw "A task with that id could not be found in the database.";
                return yield this.getTaskById(id);
            }
            catch (e) { }
        });
    },
    addComment(id, name, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw "Please provide a valid task ID";
            if (typeof name !== "string" || name == "")
                throw "Please provide a valid comment name";
            if (typeof comment !== "string" || comment == "")
                throw "Please provide a valid comment body";
            try {
                const taskCollection = yield tasks();
                let newComment = {
                    _id: uuid.v4(),
                    name: name,
                    comment: comment
                };
                const insert = taskCollection.updateOne({ _id: id }, { $push: { comments: newComment } });
                // if (insert.value == null) throw "A task with that id could not be found in the database.";
                return yield this.getTaskById(id);
            }
            catch (e) { }
        });
    },
    deleteComment(taskId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!taskId)
                throw "Please provide a valid task ID";
            if (!commentId)
                throw "Please provide a valid comment ID";
            try {
                const taskCollection = yield tasks();
                const remove = taskCollection.updateOne({ _id: taskId }, { $pull: { comments: { _id: commentId } } });
                // if (remove.value == null) throw "A task with that id could not be found in the database.";
                return yield this.getTaskById(id);
            }
            catch (e) { }
        });
    }
};
module.exports = exportedMethods;
