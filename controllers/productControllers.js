const Product = require("../models/productsModel");

exports.getAllProducts = (req, res) => {
  Product.find({ discount: "0" }).then((found) => {
    res.render("products", { cards: found });
  });
};
exports.addProduct = async (req, res) => {
  try {
    console.log(req.body)
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
