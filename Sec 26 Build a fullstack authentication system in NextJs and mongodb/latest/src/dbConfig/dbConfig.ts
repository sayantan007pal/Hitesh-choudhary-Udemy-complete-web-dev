import mongoose, { connection } from "mongoose";

const connectDB = async () => {
  try {
    // here ! is used to tell TypeScript that we are sure MONGO_URL will be defined
    await mongoose.connect(process.env.MONGO_URL!);
    const db = mongoose.connection;
    connection.on('connected', () => {
      console.log('MongoDB connected');
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
