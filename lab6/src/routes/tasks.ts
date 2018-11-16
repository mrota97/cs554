const router = express.Router();
const data = require("../data");
const taskData = data.tasks;

router.get("/", async (req, res) => {
	try {
		const taskList = await taskData.getTasks(req.query.skip, req.query.take);
		res.json(taskList);
	} catch(e) {
		res.status(500).json({ error: e });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const task = await taskData.getTaskById(req.params.id);
		res.json(task);
	} catch (e) {
		res.status(404).json({ message: "Task not found" });
	}
});

router.post("/", async (req, res) => {
	const task = req.body;
	try {
		if (Object.keys(replacement).length != 5) throw "You must provide all arguments in the body!";		
		const { title, description, hoursEstimated, completed, comments } = task;
		const newTask = await taskData.addTask(title, description, hoursEstimated, completed, comments);
		res.status(200).json(newTask);
	} catch (e) {
		res.status(500).json({ error: e });
	}
});

router.put("/:id", async (req, res) => {
	const replacement = req.body;
	try {
		if (Object.keys(replacement).length != 4) throw "You must provide all arguments in the body!";
		const { title, description, hoursEstimated, completed } = replacement;
		const replacedTask = await taskData.replaceTask(req.params.id, title, description, hoursEstimated, completed, comments);
		res.status(200).json(replacedTask)
	} catch (e) {
		res.status(500).json({ error: e });
	}
});

router.patch("/:id", async (req, res) => {
	const update = req.body;
	try {
		const updatedTask = await taskData.updateTask(req.params.id, update);
		res.status(200).json(updatedTask);
	} catch (e) {
		res.status(500).json({ error: e });
	}
});

router.post("/:id/comments", async (req, res) => {
	const com = req.body;
	try {
		const { name, comment } = com;
		const newComment = await taskData.addComment(req.params.id, name, comment);
		res.status(200).json(newComment);
	} catch (e) {
		res.status(500).json({ error: e });
	}
});

router.delete("/:taskId/:commentId", async (req, res) => {
	try {
		await taskData.deleteComment(req.params.taskId, req.params.commentId);
		res.sendStatus(200);
	} catch (e) {
		res.status(501).json({ error: e });
	}
});

module.exports = router; 