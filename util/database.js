const dotenv = require("dotenv");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

dotenv.config();

let _db;

const mongoConnect = (callback) => {
  console.log("DB Connecttion URI");
  console.log(process.env.MONGO_DB_URL);
  MongoClient.connect(process.env.MONGO_DB_URL, { useUnifiedTopology: true })
    .then((client) => {
      console.log("Database Connected !!!!");
      _db = client.db();
      callback();
      //console.log(_0db);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.manegeConnect = mongoConnect;
exports.getDB = getDB;
