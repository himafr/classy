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
    maxAge: new Date(Date.now() + 3600000),
httpOnly: true,
cookie: { path: '/', httpOnly: true, maxAge:36000000},
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
  const userSchema= new mongoose.Schema({
    name:String,
    address:String,
    year:Number,
    month:Number,
    day:Number,
    type:String,
    password:String,
  })
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User",userSchema)
  passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const Product =new mongoose.model("Product",{
  name:String,
  description:String,
  price:Number,
  discount:Number,
  type:Object
})


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html" )

})



app.get("/about",(req,res)=>{
    res.sendFile(__dirname+"/about.html" )

})
  
app.get("/products",(req,res)=>{
  res.redirect("/products/all")
})
app.get("/products/:tit",(req,res)=>{
  if(req.isAuthenticated()){
    const tit =req.params.tit;
    if(tit=="all"){
      Product.find({discount:"0"}).then((found)=>{
        res.render("products",{cards:found})
      })}
      else if(tit=="men"){
        Product.find({"type.men":"on",discount:0}).then((found)=>{
          res.render("products",{cards:found})
      })}
      else if(tit=="women"){
      Product.find({"type.women":"on",discount:0}).then((found)=>{
        res.render("products",{cards:found})
      })}
      else if(tit=="top"){
        Product.find({"type.top":"on",discount:0}).then((found)=>{
          res.render("products",{cards:found})
        })}
        else if(tit=="pants"){
          Product.find({"type.pants":"on",discount:0}).then((found)=>{
            res.render("products",{cards:found})
          })}
        else if(tit=="shoe"){
          Product.find({"type.shoe":"on",discount:0}).then((found)=>{
            res.render("products",{cards:found})
          })}
          else {
            res.send("<h1>not found </h1>")
          }}else{
            res.redirect("/login")
          }})
          
          app.get("/offers",(req,res)=>{
            res.redirect("/offers/all")
          })
          app.get("/offers/:tit",(req,res)=>{
            if(req.isAuthenticated()){
      const tit =req.params.tit;
      if(tit=="all"){
      Product.find({discount:{$gt:0}}).then((found)=>{
        res.render("offers",{cards:found})
      })}
    else if(tit=="men"){
      Product.find({"type.men":"on",discount:{$gt:0}}).then((found)=>{
        res.render("offers",{cards:found})
      })}
    else if(tit=="women"){
      Product.find({"type.women":"on",discount:{$gt:0}}).then((found)=>{
        res.render("offers",{cards:found})
      })}
    else if(tit=="top"){
      Product.find({"type.top":"on",discount:{$gt:0}}).then((found)=>{
        res.render("offers",{cards:found})
      })}
    else if(tit=="pants"){
        Product.find({"type.pants":"on",discount:{$gt:0}}).then((found)=>{
        res.render("offers",{cards:found})
      })}
    else if(tit=="shoe"){
      Product.find({"type.shoe":"on",discount:{$gt:0}}).then((found)=>{
        res.render("offers",{cards:found})
      })}
    else{
      res.send("<h1>not found </h1>")
    }}else {
      res.redirect("/login")
    }})
    

    app.post("/search",(req,res)=>{
      const rsh =req.body.search
      Product.find({"description":{$regex: rsh}}).then((found)=>{
        res.render("search",{cards:found})
      })
    })

app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/login.html")
  })
  app.get("/admin",(req,res)=>{
    if(req.isAuthenticated){
      if(req.user.type=="admin"){
        res.sendFile(__dirname+"/admin/crud.html")
      }else{
        res.redirect("/")
      }
    }else{  
      res.sendFile(__dirname+"/login.html")
  }

})

app.get("/card/:one",(req,res)=>{
  if(req.isAuthenticated()){
    const one =req.params.one;
      Product.findById(one).then((found)=>{
        res.render("card",{cards:found})
      })}else{
        res.redirect("/login")
      }})

app.get("/logout",(req,res)=>{
  req.logout(req.user, err => {
    if(err) return next(err);
    res.redirect("/");
  });
})




app.post("/signup",(req,res)=>{
  const newuser = new User({
    name:req.body.firstName,
    year: req.body.year,
    month: req.body.month,
    day: req.body.day,
    address: req.body.address,
    type:"user",
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
}) 

      app.post("/add",(req,res)=>{
      const men =req.body.men ?? "off"
      const women =req.body.women??"off"
      const top =req.body.top??"off"
      const pants =req.body.pants??"off"
      var dis =req.body.discount
      if(dis==""){
      dis=0
      }else{
      dis=dis
    }
const pro=new Product({
  name:req.body.name,
  description:req.body.description,
  price:req.body.price,
  discount:dis,
  type:{
    men:men,
    women:women,
    top:top,
    pants:pants
}
})
pro.save()
res.redirect("/admin")
})
app.post("/do",(req,res)=>{
  console.log(req.body)
  console.log(req.user.id)
})


connectDB().then(() => {
    app.listen( process.env.PORT||3000, () => {
        console.log("listening for requests");
    })
}) 
