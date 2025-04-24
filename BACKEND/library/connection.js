import dotenv from "dotenv";
import mongoose, { connect } from "mongoose";


dotenv.config()

const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongo db is connected successfully")
        return 1
    }
    catch(error)
    {
        console.log(error.message)
        process.exit(1)
    }
}

export default connectDb