const tasksRoute = require("./tasks");
const constructorMethod = app => {
    app.use("/api/tasks", tasksRoute);
    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
    });
};
module.exports = constructorMethod;
