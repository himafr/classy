const Product = require("../models/productsModel");

//get all products
exports.getAllProducts =async (req, res) => {
  try{
    const queryObj={...req.query, discount: "0" }
    const excludedQuery=['sort']
    excludedQuery.forEach(match=> delete queryObj[match])
    let queryStr=JSON.stringify(queryObj)
    queryStr=queryStr.replace(/\b(gt|lt|gte|lte)\b/g,match => `$${match}`)
    console.log(JSON.parse(queryStr))
    const query=Product.find(JSON.parse(queryStr))
    const products=await query
      res.render("products", { cards: products });
  }catch(err){
    res.status(500).json({
      status: "fail",
      message: "Server Error",
    });
  }
  };

//add new product
exports.addProduct = async (req, res) => {
  try {
    console.log(req.body);
    const newProduct = await Product.create(req.body);
    res.json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("card", { cards: product });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

//update product
exports.editProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

//delete product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
