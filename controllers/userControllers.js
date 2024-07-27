const passport = require("passport");
const User = require("../models/userModel");

// middleware to check if user is admin or not before accessing admin routes
exports.admin = (req, res, next) => {
  next();
  // if(req.user.type){
  // }else{
  //     res.send("not an admin")
  // }
};

// middleware to authenticate user before accessing protected routes
exports.auth = (req, res, next) => {
  next();
  //   if (req.isAuthenticated()) {
  //   }
  // else {
  // res.redirect("/login");
  // }
};

// signup a new user
exports.signup = async (req, res) => {
  try {
    const newUser = new User(req.body);
    User.register(newUser, req.body.password, (err, user) => {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/offers");
      });
    });
  } catch (err) {
    console.log(err);
    res.send("user name is already exist");
  }
};

// login a user
exports.login = async (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err); // default express error handler - unauthorized
    }

    if (!user) {
      res.send("check your email or password");
      console.log(err);
      // return res.redirect('/signup'); // you can redirect user to signup page if needed
    } else {
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        } else {
          if (req.isAuthenticated) {
            if (req.user.type == "admin") {
              res.sendFile(__dirname + "/admin/crud.html");
            } else {
              return res.redirect("/products");
            }
          } else {
            res.sendFile(__dirname + "/login.html");
          }
        }
      });
    }
  })(req, res);
};

//logout user
exports.logout = async (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

exports.getUserInfo=async (req,res)=>{
  try{
    const user=await User.findById(req.user.id)
    res.json(user)
  }catch(err){
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
}
exports.updateUser=async (req,res)=>{
  try{
    console.log(req.body)
    const user=await User.findByIdAndUpdate(req.user.id, req.body, {new: true})
    res.json(user)
  }catch(err){
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
 
}
exports.deleteUser=async (req,res)=>{
  try{
    await User.findByIdAndDelete(req.user.id)
    res.json({
      status: "success",
      message: "User deleted successfully",
    });
  }catch(err){
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
 
}
