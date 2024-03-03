const express =require("express")
const app = express()
const bodyParser =require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine", "ejs");   





var users=[{
    "id":0,
    "email":"test",
    "password":"test"
},
{
    "id":1,
    "email":"amirsallem",
    "password":"123456789"
},
{
    "id":2,
    "email":"hima",
    "password":"h.sallem"
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
    
    res.render("products",{"id":0,"auser":""})
})

app.get("/views/products.ejs",(req,res)=>{
    res.redirect("/products")
})



app.get("/offers",(req,res)=>{
    res.render("offers",{"id":0,"auser":""})
 })
app.get("/views/offers.ejs",(req,res)=>{
    res.redirect("/offers")
})



 
app.post("/logi",(req,res)=>{
const user = req.body.user;
const pass = req.body.password;
let iid =0;
for(var element of users){
    if(user ==element.email&&pass==element.password){
iid =element.id
}   
}  if(iid==1){
    res.sendFile(__dirname+"/admin/crud.html")
}else if(iid==0){   
    res.send("<h1>please check your email or oassword !")
}
else{
    console.log(iid)
    res.render("offers",{"id":iid,"auser":user})  
  }
}) 
console.log(users.length)
app.post("/signup",(req,res)=>{
    try{
        const newUser = req.body.email;
        const newPass = req.body.password;
        let id =0;
        for(var element of users){
            if(newUser ==element.email){       
            id++
            } 
        }
        if (id==1){
            res.send("pls check your email or password")
        }
        else if (id==0){
            users.push({
                "id":users.length,
                "email":newUser,
            "password":newPass
            }) 
            console.log(users)
            res.redirect("/products")

        }
}
catch{
    res.send("something went wrong")
}
    
})

app.listen(process.env.PORT||3000,()=>{
    console.log("sarted port 3000")
        
}) 