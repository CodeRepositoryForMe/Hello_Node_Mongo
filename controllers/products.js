const { v4: uuidv4 } = require("uuid");
const Helper = require("../util/helper");
const Product = require("../models/product");

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
  Product.findByID(productID)
    .then((product) => {
      res.render("shop/product-details", {
        pageTitle: "Product Details",
        pageName: "pageDetails",
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Show all product in catelog
exports.exeShowProductCatelog = (req, res, next) => {
  console.log("Catelog page here !!!");
  Product.fetchAll()
    .then((products) => {
      res.render("shop/catelog", {
        pageTitle: "Catelog",
        prods: products,
        doctTitle: "Shopping Catalog",
        pageName: "catelog",
        catelog: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get all products from catr file
exports.exeGetCart = (req, res, next) => {
  console.log("Cart page here !!!");

  res.render("shop/cart", {
    pageTitle: "Cart",
    cart: req.loggedInUser.getCart(),
    pageName: "cart",
  });
};

// Add product to cart
exports.exePostCart = (req, res, next) => {
  console.log("Post request for Cart");
  const productID = req.body.productID;
  Product.findByID(productID)
    .then((product) => {
      return req.loggedInUser.addToCart(product);
    })
    .then((result) => {
      console.log("Product Added to Cart!!!");
      //console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log("Fauiled to add product in Cart");
      console.log(err);
    });

  //
};

// Delete selected product
exports.exeDeleteCartProduct = (req, res, next) => {
  console.log("Delete this product !!");
  const productID = req.params.productid;
  console.log(productID);
  req.loggedInUser.deleteFromCart(productID).then((result) => {
    res.redirect('/cart');
    // res.render("shop/cart", {
    //   pageTitle: "Cart",
    //   pageName: "cart",
    //   cart: req.loggedInUser.getCart(),
    // });
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
