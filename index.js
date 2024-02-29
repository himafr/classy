const express =require("express")
const app = express()
const bodyParser =require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine", "ejs");   


var hideIcon ="block"; 

var letMe =[{
    name:"hima"
    ,password:"h.sallem"
}]
var users=[{
    email:"amirsallem@gmail.com",
    password:"123456789"
}]


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html" )
})
app.get("/index.html",(req,res)=>{
    res.redirect("/")
})



app.get("/about",(req,res)=>{
    res.sendFile(__dirname+"/about.html" )
})
app.get("/about.html",(req,res)=>{
    res.redirect("/about")
})
  

app.get("/products",(req,res)=>{
    console.log(users)
    res.render("products",{hideIcon:hideIcon})
})
app.get("/views/products.ejs",(req,res)=>{
    res.redirect("/products")
})



app.get("/offers",(req,res)=>{
    res.render("offers",{hideIcon:hideIcon})
 })
app.get("/views/offers.ejs",(req,res)=>{
    res.redirect("/offers")
})



 
app.post("/logi",(req,res)=>{
const user = req.body.user;
const pass = req.body.password;

for(var element of users){
    if (user ==letMe[0].name&&pass==letMe[0].password){
        res.sendFile(__dirname+"/admin/crud.html")
        }
    else if(user ==element.email&&pass==element.password){
   hideIcon ="none"
      res.redirect("/products")  
}  else{
    res.send("<h1>please check your email or oassword !")
  }
}   
}) 

app.post("/signup",(req,res)=>{
    try{
        const newUser = req.body.email;
        const newPass = req.body.password;
        for(var element of users){
            if (newUser==letMe[0].name&&newPass==letMe[0].password){
                res.send("pls check your email or password")
            }
            else if(newUser ==element.email&&newPass==element.password){       
                res.send("pls check your email or password")
            }    else{
                users.push({
                    email:newUser,
                password:newPass
                }) 
                hideIcon ="none"
                res.redirect("/products")
                console.log(users)
        }
    }
}catch{
    res.send("something went wrong")
}
    
})

app.listen(process.env.PORT||3000,()=>{
    console.log("sarted port 3000")
        
})