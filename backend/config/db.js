import mongoose from "mongoose";

// function running to be able connecting database using its connection string
// and then console.log to show the connection status

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // process.exit code 1 means failure, 0 means success
  }
};
