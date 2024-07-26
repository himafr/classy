require("dotenv").config()
const mongoose =require("mongoose")

const app=require('./app')


const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO);
    } catch (error) {
      console.log(error);
      process.exit();
    }
  }

const port= process.env.PORT||3000
connectDB().then(() => {
    app.listen(port, () => {
        console.log("listening for requests :",port);
    })
}) 
