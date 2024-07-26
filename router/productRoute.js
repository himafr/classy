const express=require('express')
const productControllers=require('../controllers/productControllers')
const router= express.Router()
router
.route('/')
.get(productControllers.auth,productControllers.getAllProducts)
.post(productControllers.admin,productControllers.addProduct)
router
.route('/:id')
.get(productControllers.getProduct)
.patch(productControllers.admin,productControllers.editProduct)
.delete(productControllers.admin,productControllers.deleteProduct)

module.exports=router
     
    //         app.get("/offers",(req,res)=>{
    //           res.redirect("/offers/all")
    //         })
    //         app.get("/offers/:tit",(req,res)=>{
    //           if(req.isAuthenticated()){
    //     const tit =req.params.tit;
    //     if(tit=="all"){
    //     Product.find({discount:{$gt:0}}).then((found)=>{
    //       res.render("offers",{cards:found})
    //     })}
    //   else if(tit=="men"){
    //     Product.find({"type.men":"on",discount:{$gt:0}}).then((found)=>{
    //       res.render("offers",{cards:found})
    //     })}
    //   else if(tit=="women"){
    //     Product.find({"type.women":"on",discount:{$gt:0}}).then((found)=>{
    //       res.render("offers",{cards:found})
    //     })}
    //   else if(tit=="top"){
    //     Product.find({"type.top":"on",discount:{$gt:0}}).then((found)=>{
    //       res.render("offers",{cards:found})
    //     })}
    //   else if(tit=="pants"){
    //       Product.find({"type.pants":"on",discount:{$gt:0}}).then((found)=>{
    //       res.render("offers",{cards:found})
    //     })}
    //   else if(tit=="shoe"){
    //     Product.find({"type.shoe":"on",discount:{$gt:0}}).then((found)=>{
    //       res.render("offers",{cards:found})
    //     })}
    //   else{
    //     res.send("<h1>not found </h1>")
    //   }}else {
    //     res.redirect("/login")
    //   }})
      
  
    //   app.post("/search",(req,res)=>{
    //     const rsh =req.body.search
    //     Product.find({"description":{$regex: rsh}}).then((found)=>{
    //       res.render("search",{cards:found})
    //     })
    //   })
  