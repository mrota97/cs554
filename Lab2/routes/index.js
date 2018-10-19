const portfolioRoute = require("./portfolio");

const constructorMethod = app => {
	app.use("/", portfolioRoute);
	
	app.use("*", (req, res) => {
		res.status(404);
	});
};

module.exports = constructorMethod;