// This file is responsible for establishing a connection to the MongoDB database
// using Mongoose and handling any connection errors.

// Import mongoose for database connection
import mongoose from "mongoose";

// Function to connect to the MongoDB database
export const connectDB = async () => {
  try {
    // Connect to the database using the connection string from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log the connection status
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log the error message and exit the process with failure code
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with code 1 (failure)
  }
};
