const express =require("express")
const app = express()
const bodyParser =require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine", "ejs");   


var hideIcon ="block"; 
var cards =[];
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
var message =0
var userName =[1,2,3]
var passName =[1,2,3]  

app.get("/products",(req,res)=>{
    res.render("products",{hideIcon:hideIcon,checkUser:userName,checkPass:passName,message:message})
})
app.get("/views/products.ejs",(req,res)=>{
    res.redirect("/products")
})



app.get("/offers",(req,res)=>{
    res.render("offers",{hideIcon:hideIcon,checkUser:userName,checkPass:passName,message:message})
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
        res.render("products", {hideIcon:hideIcon,checkUser:userName,checkPass:passName,message:message})
    }    else{
        message=0
        userName =user
        passName =pass  
        res.render("products",{hideIcon:hideIcon,checkUser:userName,checkPass:passName,message:message})   
    }
}   
})   
 
app.post("/login",(req,res)=>{
const user = req.body.user;
const pass = req.body.password;

for(var element of users){
    if (user ==letMe[0].name&&pass==letMe[0].password){
        res.sendFile(__dirname+"/admin/crud.html")
        }
    else if(user ==element.email&&pass==element.password){
   hideIcon ="none"
        res.render("offers", {hideIcon:hideIcon,checkUser:userName,checkPass:passName,message:message})
    }    else{
        message=0
        userName =user
        passName =pass  
        res.render("offers",{hideIcon:hideIcon,checkUser:userName,checkPass:passName,message:message})   
    }
}   
})   


// app.post("/sginup",(req,res)=>{
//     try{
//         const newUser = req.body.email;
//         const newPass = req.body.password;
//         for(var element of users){
//             if (newUser==letMe[0].name&&newPass==letMe[0].password){
//                 res.send("pls check your email or password")
//             }
//             else if(newUser ==element.email&&newPass==element.password){       
//                 res.send("pls check your email or password")
//             }    else{
//                 users.push({
//                     email:newUser,
//                     password:newPass
//                 }) 
//                 res.render("products", {hideIcon:hideIcon})
//                 console.log(users)
            
//         }
//     }
    
// }catch{
//     res.send("something went wrong")
// }
    
// })

console.log(users)
app.listen(process.env.PORT||3000,()=>{
    console.log("sarted port 3000")
        
})