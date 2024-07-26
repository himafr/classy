const mongoose =require("mongoose")

const Product =new mongoose.model("Product",{
  name:{
    type:String,
    required:true,
    trim:true,
    minlength:3,
    maxlength:50,
  },
  description:{
    type:String,
    required:true,
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
    max:100,
  },
  type:{
    type:String,
    enum:["Men","Women","Top","Pants"],
    default:["Men"],
    required:true,
  }
})
module.exports=Product
