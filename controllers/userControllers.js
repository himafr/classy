const passport =require("passport")
const User= require('../models/userModel')

exports.admin=(req,res,next)=>{
  next();
  // if(req.user.type){
  // }else{
  //     res.send("not an admin")
  // }
  }
  
exports.auth=(req,res,next)=>{
  next();
//   if (req.isAuthenticated()) {
//   }
// else {
// res.redirect("/login");
// }
}

exports.logout=async(req,res)=>{
    req.logout(req.user, err => {
      if(err) return next(err);
      res.redirect("/");
    });
  }
  
  exports.signup=async(req,res)=>{
    try{
        const newUser = new User(req.body)
        User.register(newUser,req.body.password,(err,user)=>{
              passport.authenticate("local")(req,res,()=>{
                res.redirect("/offers")
              } )
          })   

    }catch (err){
            console.log(err)
            res.send("user name is already exist")
          
    }
  }
  
exports.login=async(req,res)=>{
    
      passport.authenticate('local',(err, user, info) => {
        if (err) {
          console.log(err)
          return next(err);  // default express error handler - unauthorized 
        }
    
        if (!user) {
          res.send("check your email or password")
          console.log(err)
          // return res.redirect('/signup'); // you can redirect user to signup page if needed
        }else{
        req.logIn(user, function(err) {
          if (err) {
            return next(err);
          }else{
            if(req.isAuthenticated){
              if(req.user.type=="admin"){
                res.sendFile(__dirname+"/admin/crud.html")
              }else{
                return res.redirect('/products');
              }
            }else{  
              res.sendFile(__dirname+"/login.html")
          }
        }  });
      }
      })(req, res);
  }
  
