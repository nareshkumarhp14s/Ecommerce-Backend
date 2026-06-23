import mongoose from "mongoose";

const connectDB = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URI);
       console.log("MongoDB connected")
    } catch (err) {
        console.error('error connect to DB ', err)
    }
}

export default connectDB;