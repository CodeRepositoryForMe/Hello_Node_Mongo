const mongoDB = require("mongodb");
const getDB = require("../util/database").getDB;

class Product {
  constructor(title, price, description, imageURL, id) {
    this.title = title;
    this.cost = price;
    this.description = description;
    this.url = imageURL;
    this._id = id;
  }

  save() {
    const db = getDB();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: new mongoDB.ObjectId(this._id) }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDB();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findByID(productID) {
    const db = getDB();
    console.log(productID);
    return db
      .collection("products")
      .find({ _id: new mongoDB.ObjectId(productID) })
      .next()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteByID(productID) {
    const db = getDB();
    console.log(productID);
    return db.collection("products")
      .deleteOne({ _id: new mongoDB.ObjectId(productID) })
      .then((result) => {
        console.log("deleted");
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
