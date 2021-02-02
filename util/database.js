const dotenv = require("dotenv");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

dotenv.config();

const mongoConnect = (callback) => {
    console.log("DB Connecttion URI");
    console.log(process.env.DB_URL);
  MongoClient.connect(process.env.DB_URL)
    .then((client) => {
      console.log("Database Connected !!!!");
      console.log(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;