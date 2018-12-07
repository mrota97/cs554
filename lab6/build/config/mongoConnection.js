var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Matt Rota
// I pledge my honor that I have abided by the Stevens Honor System.
import * as mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;
const settings = require("../settings");
const mongoConfig = settings.mongoConfig;
let fullMongoUrl = `${mongoConfig.serverUrl}${mongoConfig.database}`;
let _connection = undefined;
let _db = undefined;
module.exports = () => __awaiter(this, void 0, void 0, function* () {
    if (!_connection) {
        _connection = yield MongoClient.connect(fullMongoUrl, { useNewUrlParser: true });
        _db = yield _connection.db(mongoConfig.database);
    }
    return _db;
});
