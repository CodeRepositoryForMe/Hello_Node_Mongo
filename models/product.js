const mongoDB = require("mongodb");
const getDB = require("../util/database").getDB;

class Product {
  constructor(title, price, description, imageURL) {
    this.title = title;
    this.cost = price;
    this.description = description;
    this.url = imageURL;
  }

  save() {
    const db = getDB();
    console.log(this);
    return db
      .collection("products")
      .insertOne(this)
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
    console.log("In find by ID");
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
}

module.exports = Product;
