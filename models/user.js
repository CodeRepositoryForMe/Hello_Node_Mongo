const getDB = require("../util/database").getDB;
const mongoDB = require("mongodb");

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  save() {
    const db = getDB();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {
        console.log("User created");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findByID(userId) {
    const db = getDB();
    console.log("userId-->");
    console.log(userId);
    return db
      .collection("users")
      .find({ _id: new mongoDB.ObjectId(userId) })
      .next()
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
