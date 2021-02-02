const productObj = require("../models/product");
const { v4: uuidv4 } = require("uuid");

// Add product to Catelog
exports.exePostProducts = (req, res, next) => {
  console.log("Add product to Catelog !!");

  res.redirect("/catelog");
};

// Get list of products to select product for update
exports.exeGetToPutProduct = (req, res, next) => {
  console.log("Update existing product !!");

  res.render("admin/products", {
    pageTitle: "Edit Product",
    //prods: products,
    pageName: "editProduct",
    catelog: true,
  });
};

// Get selected product details
exports.exeGetToUpdateProduct = (req, res, next) => {
  console.log("Show selected product details!!");

  res.render("admin/edit-product", {
    pageTitle: "Update Product",
    //prod: result,
    pageName: "updateProduct",
  });
};

// Update selected product in product catelog
exports.exePutProduct = (req, res, next) => {
  console.log("Update this product");

  res.redirect("/editProduct");
};

// Delete selected product from product catelog
exports.exeDeleteProduct = (req, res, next) => {
  console.log("Delete this product");

  res.redirect("/editProduct");
};
