const Product=require('../models/productsModel')
exports.admin=(req,res,next)=>{
if(req.user.type){
    next()
}else{
    res.send("not an admin")
}
}
exports.auth=(req,res,next)=>{
    if (req.isAuthenticated()) {
      next();
    }
else {
  res.redirect("/login");
}
}
exports.getAllProducts = (req, res) => {
    Product.find({ discount: "0" }).then((found) => {
      res.render("products", { cards: found });
}) 
};
exports.addProduct = () => {};
exports.getProduct = () => {};
exports.editProduct = () => {};
exports.deleteProduct = () => {};
