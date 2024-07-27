const mongoose =require("mongoose")

const Product = mongoose.model("Product",{
  name:{
    type:String,
    required:true,
    trim:true,
    minlength:3,
    maxlength:50,
  },
  description:{
    type:String,
    trim:true,
    minlength:10,
    maxlength:500,
    default:"No description provided."
  },
  price:{
    type:Number,
    required:[true,'no price was set'],
    min:1,
    max:1000000,
  },
  discount:{
    type:Number,
    default:0,
    min:0,
  },
  type:{
    type:String,
    enum:["men","women","top","pants","shoe"],
    default:'men'
  }
})
module.exports=Product
