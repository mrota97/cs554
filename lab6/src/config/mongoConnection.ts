// Matt Rota
// I pledge my honor that I have abided by the Stevens Honor System.
import * as mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;
const settings = require("../settings");
const mongoConfig = settings.mongoConfig

let fullMongoUrl: string = `${mongoConfig.serverUrl}${mongoConfig.database}`
let _connection = undefined;
let _db = undefined;

module.exports = async () => {
	if (!_connection) {
		_connection = await MongoClient.connect(fullMongoUrl, { useNewUrlParser: true });
		_db = await _connection.db(mongoConfig.database)
	}

	return _db;
}
