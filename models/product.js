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
    //console.log("This is product");
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
      }).catch(err => {
          console.log(err);
      });
  }
}

module.exports = Product;
