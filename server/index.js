require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const port = 3000;
const checkForSession = require(`${__dirname}/middlewares/checkForSession`);
const swagController = require(`${__dirname}/controllers/swag_controller`);
const authController = require(`${__dirname}/controllers/auth_controller`);
const cartController = require(`${__dirname}/controllers/cart_controller`);
const searchController = require(`${__dirname}/controllers/search_controller`);

const app = express();

app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    ressave: false,
    saveUninitialized: false
  })
);

app.use(checkForSession);
app.use(express.static(`${__dirname}/build`));

app.get("/api/swag", swagController.read);
app.post("/api/login", authController.login);
app.post("/api/register", authController.register);
app.post("/api/signout", authController.signout);
app.get("/api/user", authController.getUser);
app.post("/api/cart", cartController.add);
app.post("/api/cart/checkout", cartController.checkout);
app.delete("/api/cart", cartController.remove);
app.get("/api/search", searchController.search);

app.listen(port, () => {
  console.log(`Currently listening on ${port}`);
});
