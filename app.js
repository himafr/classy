const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const userRoute = require("./router/userRoute");
const productRoute=require('./router/productRoute')
//middlewares

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SECRET,
    maxAge: new Date(Date.now() + 3600000),
    httpOnly: true,
    cookie: { path: "/", httpOnly: true, maxAge: 36000000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRoute);
app.use("/products",productRoute )
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/about.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});
app.get("/admin", (req, res) => {
  if (req.isAuthenticated) {
    if (req.user.type == "admin") {
      res.sendFile(__dirname + "/admin/crud.html");
    } else {
      res.redirect("/");
    }
  } else {
    res.sendFile(__dirname + "/login.html");
  }
});

app.get("/card/:one", (req, res) => {
  if (req.isAuthenticated()) {
    const one = req.params.one;
    Product.findById(one).then((found) => {
      res.render("card", { cards: found });
    });
  } else {
    res.redirect("/login");
  }
});

app.post("/add", (req, res) => {
  const men = req.body.men ?? "off";
  const women = req.body.women ?? "off";
  const top = req.body.top ?? "off";
  const pants = req.body.pants ?? "off";
  var dis = req.body.discount;
  if (dis == "") {
    dis = 0;
  } else {
    dis = dis;
  }

  const pro = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    discount: dis,
    type: {
      men: men,
      women: women,
      top: top,
      pants: pants,
    },
  });
  pro.save();
  res.redirect("/admin");
});
app.post("/do", (req, res) => {
  console.log(req.body);
  console.log(req.user.id);
});

module.exports = app;
