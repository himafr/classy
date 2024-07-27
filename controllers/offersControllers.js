const Product=require('../models/productsModel')

//get all offers
exports.getAllOffers = async (req, res) => {
  try{
    const queryObj={...req.query,  discount: { gt: 0 }  }
    const excludedQuery=['sort']
    excludedQuery.forEach(match=> delete queryObj[match])
    let queryStr=JSON.stringify(queryObj)
    queryStr=queryStr.replace(/\b(gt|lt|gte|lte)\b/g,match => `$${match}`)
    console.log(JSON.parse(queryStr))
    const query=Product.find(JSON.parse(queryStr))
    const products=await query
      res.render("offers", { cards: products });
  }catch(err){
    res.status(500).json({
      status: "fail",
      message: "Server Error",
    });
  }
};

//get single offer
exports.getOffers = async (req, res) => {
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

//update an offer
exports.updateOffers = async (req, res) => {
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

//delete an offer
exports.deleteOffers = async (req, res) => {
  try {
    const product=await Product.findByIdAndUpdate(req.params.id,{discount:0},{
      new: true,
    });
    res.status(204).json({
      status: "success",
      data:{
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
