require("dotenv").config()
const express =require("express")
const app = express()
const bodyParser =require("body-parser")
const ejs =require("ejs")
const mongoose =require("mongoose")
const session =require("express-session")
const passport =require("passport")
const passportLocalMongoose=require("passport-local-mongoose")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine", "ejs");  
app.use(session({
    secret:process.env.SEPART,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO);
    } catch (error) {
      console.log(error);
      process.exit();
    }
  }
  const userchema= new mongoose.Schema({
    name:String,
    password:String,
  })
userchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User",userchema)
  passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html" )

})



app.get("/about",(req,res)=>{
    res.sendFile(__dirname+"/about.html" )

})
  

app.get("/products",(req,res)=>{
    
res.render("products")
})

app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/login.html")
})



app.get("/offers",(req,res)=>{
    if(req.isAuthenticated()){
        res.render("offers")
    }else{
        res.redirect("login")
    }

})

app.post("/signup",(req,res)=>{
const newuser = new User({
    name: req.body.firstName,
    // lastName: req.body.lastName,
    // address: req.body.address,
    username: req.body.username
  })
    User.register(newuser,req.body.password,(err,user)=>{
        if(err){
          console.log(err)
          res.send("user name is already exist")
        }else{
          passport.authenticate("local")(req,res,()=>{
            res.redirect("/offers")
          } )
        }
      }) 

})
app.post("/login",(req,res)=>{
    passport.authenticate('local',
    (err, user, info) => {
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
        return res.redirect('/offers');
      }  });
    }
    })(req, res);


}) 


connectDB().then(() => {
    app.listen( process.env.PORT||3000, () => {
        console.log("listening for requests");
    })
}) 