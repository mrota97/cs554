const express = require("express");
const app = express();
const configRoutes = require("./routes");
const bodyParser = require("body-parser");
var urlCounter = {}

// Define my middleware here

// Log all requests by URL, method, and request body.
var logger = function(req, res, next) {
	console.log("---New request---");
	console.log("URL:", req.originalUrl);
	console.log("Method:", req.method);
	console.log("Body:", req.body, "\n");
	next();
}

// Log how many times a URL has been requested before
var counter = function(req, res, next) {
	if (req.originalUrl in urlCounter) {
		urlCounter[req.originalUrl] += 1;
	} else {
		urlCounter[req.originalUrl] = 1;
	}
	console.log("---URL Stats---");
	console.log("URL:", req.originalUrl, "has been requested:", urlCounter[req.originalUrl], "time(s).\n")
	next();
}

app.use(bodyParser.json());
app.use(logger);
app.use(counter);

configRoutes(app);

app.listen(3000, () => {
	console.log("The express server has been launched.");
	console.log("Routes are running on http://localhost:3000");
});