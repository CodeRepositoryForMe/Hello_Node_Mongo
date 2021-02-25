const getDB = require("../util/database").getDB;
const mongoDB = require("mongodb");

const ObjectId = new mongoDB.ObjectId();

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
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

  getCart() {
    return this.cart;
  }

  addToCart(product) {
    console.log("In Cart !!!");
    let cartProductIndex = -1;
    let updatedCartItems = [];
    if (this.cart && this.cart.items) {
      cartProductIndex = this.cart.items.findIndex((cartProduct) => {
        return cartProduct._id.toString() === product._id.toString();
      });
      updatedCartItems = [...this.cart.items];
    }
    let newQuantity = 1;
    if (cartProductIndex >= 0) {
      console.log("Existing one!!!");
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      console.log("New one!!!");
      updatedCartItems.push({ ...product, quantity: 1 });
    }
    const updatedCart = { items: updatedCartItems };
    //console.log(updatedCart);
    const db = getDB();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongoDB.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  deleteFromCart(productId) {
    if (this.cart && this.cart.items) {
      let updatedCartItems = this.cart.items.filter((cartProduct) => {
        return cartProduct._id.toString() !== productId.toString();
      });
      const db = getDB();
      return db
        .collection("users")
        .updateOne(
          { _id: new mongoDB.ObjectId(this._id) },
          { $set: { cart: { items: updatedCartItems } } }
        );
    }
  }

  addOrder() {
    console.log("In Order !!");
    const order = {
      items: this.cart.items,
      user: {
        _id: new mongoDB.ObjectId(this._id),
        name: this.name,
      },
    };
    const db = getDB();
    return db
      .collection("orders")
      .insertOne(order)
      .then((result) => {
        console.log(result.insertedId);
        const output = {
          insertedId: result.insertedId,
          acknowledged: result.acknowledged,
        };
        this.cart = { items: [] };
        return output;
      });
  }

  getOrder(OrderId) {
    const db = getDB();
    return db
      .collection("orders")
      .find({ _id: new mongoDB.ObjectId(OrderId) })
      .next()
      .then((order) => {
        return order;
      });
  }

  getOrders() {
    const db = getDB();
    return db
      .collection("orders")
      .find({ "user._id": new mongoDB.ObjectId(this._id) })
      .toArray();
  }

  cleanUserCart() {
    const db = getDB();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongoDB.ObjectId(this._id) },
        { $set: { cart: { items: [] } } }
      );
  }
}

module.exports = User;
