var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const router = express.Router();
const data = require("../data");
const taskData = data.tasks;
router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const taskList = yield taskData.getTasks(req.query.skip, req.query.take);
        res.json(taskList);
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}));
router.get("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const task = yield taskData.getTaskById(req.params.id);
        res.json(task);
    }
    catch (e) {
        res.status(404).json({ message: "Task not found" });
    }
}));
router.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const task = req.body;
    try {
        if (Object.keys(replacement).length != 5)
            throw "You must provide all arguments in the body!";
        const { title, description, hoursEstimated, completed, comments } = task;
        const newTask = yield taskData.addTask(title, description, hoursEstimated, completed, comments);
        res.status(200).json(newTask);
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}));
router.put("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const replacement = req.body;
    try {
        if (Object.keys(replacement).length != 4)
            throw "You must provide all arguments in the body!";
        const { title, description, hoursEstimated, completed } = replacement;
        const replacedTask = yield taskData.replaceTask(req.params.id, title, description, hoursEstimated, completed, comments);
        res.status(200).json(replacedTask);
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}));
router.patch("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const update = req.body;
    try {
        const updatedTask = yield taskData.updateTask(req.params.id, update);
        res.status(200).json(updatedTask);
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}));
router.post("/:id/comments", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const com = req.body;
    try {
        const { name, comment } = com;
        const newComment = yield taskData.addComment(req.params.id, name, comment);
        res.status(200).json(newComment);
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}));
router.delete("/:taskId/:commentId", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield taskData.deleteComment(req.params.taskId, req.params.commentId);
        res.sendStatus(200);
    }
    catch (e) {
        res.status(501).json({ error: e });
    }
}));
module.exports = router;
