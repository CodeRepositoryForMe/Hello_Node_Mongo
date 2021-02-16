const { v4: uuidv4 } = require("uuid");
const Product = require("../models/product");
const mongoDB = require("mongodb");

const ObjectId = mongoDB.ObjectId;

// Add product to Catelog
exports.exePostProducts = (req, res, next) => {
  console.log("Add product to Catelog !!");

  console.log(req.body);

  const title = req.body.Title;
  const price = req.body.Cost;
  const description = req.body.Description;
  const imageURL = req.body.ProductLink;
  const product = new Product(title, price, description, imageURL);
  product
    .save()
    .then((result) => {
      res.redirect("/catelog");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get list of products to select product for update
exports.exeGetToPutProduct = (req, res, next) => {
  console.log("Update existing product !!");
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        pageTitle: "Edit Product",
        prods: products,
        pageName: "editProduct",
        catelog: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get selected product details
exports.exeGetToUpdateProduct = (req, res, next) => {
  const productID = req.params.productid;
  Product.findByID(productID)
    .then((product) => {
      res.render("admin/edit-product", {
        pageTitle: "Update Product",
        prod: product,
        pageName: "updateProduct",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Update selected product in product catelog
exports.exePutProduct = (req, res, next) => {
  const title = req.body.Title;
  const price = req.body.Cost;
  const description = req.body.Description;
  const imageURL = req.body.ProductLink;
  const id = req.body.productid;

  const product = new Product(
    title,
    price,
    description,
    imageURL,
    new ObjectId(id)
  );
  product
    .save()
    .then((result) => {
      res.redirect("/editProduct");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete selected product from product catelog
exports.exeDeleteProduct = (req, res, next) => {
  console.log("Delete this product");
  const productID = req.body.productid;
  console.log(productID);
  Product.deleteByID(productID)
    .then((result) => {
        res.redirect("/editProduct");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/editProduct");
};
