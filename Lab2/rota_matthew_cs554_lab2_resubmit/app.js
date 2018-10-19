const express = require("express");
const app = express();
const configRoutes = require("./routes");
const bodyParser = require("body-parser");

app.use(express.static(__dirname + '/public'));
app.set('public', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());

configRoutes(app);

app.listen(3000, () => {
	console.log("The express server has been launched.");
	console.log("Routes are running on http://localhost:3000");
});