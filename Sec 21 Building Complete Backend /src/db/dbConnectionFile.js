import mongoose from "mongoose";


const connectDb = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongodb connected successfully`)

        
    } catch (err) {
        console.error(`MongoDB connection failed with this error: ${err}`)
        process.exit(1)
    }
}
export default connectDb 