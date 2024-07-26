const express=require('express')
const router= express.Router()
const productControllers=require('../controllers/productControllers')
const userControllers=require('../controllers/userControllers')

router
.route('/')
.get(productControllers.getAllProducts)
.post(userControllers.admin,productControllers.addProduct)

router
.route('/:id')
.get(productControllers.getProduct)
.patch(userControllers.admin,productControllers.editProduct)
.delete(userControllers.admin,productControllers.deleteProduct)

module.exports=router
    //   app.post("/search",(req,res)=>{
    //     const rsh =req.body.search
    //     Product.find({"description":{$regex: rsh}}).then((found)=>{
    //       res.render("search",{cards:found})
    //     })
    //   })
  