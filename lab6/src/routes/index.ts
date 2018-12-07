import * as express from "express";
const tasksRoute = require("./tasks");

const constructorMethod = app => {
	app.use("/api/tasks", tasksRoute);

	app.use("*", (req: express.Request, res: express.Response) => {
		res.status(404).json({ error: "Not found" });
	});
};

module.exports = constructorMethod;