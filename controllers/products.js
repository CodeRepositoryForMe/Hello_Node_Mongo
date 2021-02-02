const { v4: uuidv4 } = require("uuid");
const Helper = require("../util/helper");

// Get all products
exports.exeGetProducts = (req, res, next) => {
  console.log("This is product page!!!");

  res.render("admin/add-product", {
    pageTitle: "Add Product",
    pageName: "product",
    addproduct: true,
  });
};

// Get product by ID
exports.exeGetProduct = (req, res, next) => {
  const productID = req.params.productid;
  console.log(productID);

  res.render("shop/product-details", {
    pageTitle: "Product Details",
    pageName: "pageDetails",
    product: productID,
  });
};

// Show all product in catelog
exports.exeShowProductCatelog = (req, res, next) => {
  console.log("Catelog page here !!!");

  res.render("shop/catelog", {
    pageTitle: "Catelog",
    //prods: products,
    doctTitle: "Shopping Catalog",
    pageName: "catelog",
    //hasProduct: products.length > 0,
    catelog: true,
  });
};

// Get all products from catr file
exports.exeGetCart = (req, res, next) => {
  console.log("Cart page here !!!");

  res.render("shop/cart", {
    pageTitle: "Cart",
    //cart: cart[0],
    pageName: "cart",
  });
};

// Add product to cart
exports.exePostCart = (req, res, next) => {
  console.log("Post request for Cart");
  const productID = req.body.productID;
  console.log(productID);

  res.render("shop/cart", {
    pageTitle: "Cart",
    pageName: "cart",
    //cart: cart[0],
  });
};

// Delete selected product
exports.exeDeleteCartProduct = (req, res, next) => {
  console.log("Delete this product !!");
  const productID = req.params.productid;
  console.log(productID);

  res.render("shop/cart", {
    pageTitle: "Cart",
    pageName: "cart",
    //cart: cart[0],
  });
};

exports.exeOrders = (req, res, next) => {
  console.log("This is order page");

  res.render("shop/orders", {
    pageTitle: "Orders",
    pageName: "orders",
  });
};

exports.exePostOrders = (req, res, next) => {
  console.log("Create order from Cart");

  res.render("shop/orders", {
    pageTitle: "Orders",
    pageName: "orders",
  });
};

exports.exeCheckout = (req, res, next) => {
  console.log("This is check-out page");

  res.render("shop/checkout", {
    pageTitle: "Checkout",
    pageName: "checkout",
  });
};

exports.exeIndex = (req, res, next) => {
  console.log("This is index page");

  res.render("shop/index", {
    pageTitle: "Index",
    pageName: "index",
    //prods: rows,
  });
};
