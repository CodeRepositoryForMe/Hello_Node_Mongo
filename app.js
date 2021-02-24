const http = require("http");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const express = require("express");
const bodyParser = require("body-parser");

// Routes
const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const userRouter = require("./routes/user");
const defaultRoute = require("./routes/default");

// Helper
const Helper = require("./util/helper");

// Database
const mongoConnect = require("./util/database").manegeConnect;
const User = require("./models/user");

// Controllers
const errorController = require("./controllers/Error");

const app = express();

// For ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByID("5fa91b81b430b0498c427cb9")
    .then((user) => {
      req.loggedInUser = new User(user.name, user.email, user.cart, user._id);
      //console.log("User********");
      //console.log(req.loggedInUser);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/", (req, res, next) => {
  console.log("This always Executes !!!");
  //console.log(req.body);
  next();
});

app.use(adminRouter.routes);
app.use(shopRouter);
app.use("/user/", userRouter);
app.use(defaultRoute);

app.use(errorController.errorPageNotFound);

const server = http.createServer(app);

mongoConnect(() => {
  app.listen(3000);
  console.log("Server Started !!!!");
});
