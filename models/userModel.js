const mongoose =require("mongoose")
const passport =require("passport")
const passportLocalMongoose=require("passport-local-mongoose")

const date=new Date
const userSchema= new mongoose.Schema({
    name:{
      type:String,
      required:true,
    },
    address:{
      type:String,
      default:"unknown"
    },
    year:{
      type:Number,
      min:1990,
      max:date.getFullYear(),

    },
    month:{
      type:Number,
      min:1,
      max:12,
    },
    day:{
      type:Number,
      min:1,
      max:31,
    },
    type:{
      type:String,
      default:"user"
    },
  })
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User",userSchema)
  passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports=User
