// This file is the entry point for the backend server of the MERN application.
// It sets up the Express server, connects to the MongoDB database, and defines routes for handling API requests.
// Additionally, it serves the frontend build files in production.

import express from "express"; // Import express
import dotenv from "dotenv"; // Import dotenv for environment variable management
import { connectDB } from "./config/db.js"; // Import connectDB function to connect to MongoDB
import productRoutes from "./routes/product.route.js"; // Import product routes
import path from "path"; // Import path for handling file paths

// ======== Initialize Environment Variables ========
dotenv.config(); // Load environment variables from .env file

// ======== Create Express App ========
const app = express(); // Create an Express application
app.use(express.json()); // Middleware to parse JSON data in request bodies

// ======== Define Port ========
const PORT = process.env.PORT || 5000; // Use port from environment variables or default to 5000

// ======== Define Routes ========
app.use("/api/products", productRoutes); // Use product routes for API requests

// ======== Serve Frontend in Production ========
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve(); // Get the current directory name
  app.use(express.static(path.join(__dirname, "/frontend/dist"))); // Serve static files from the frontend build folder

  // Serve the index.html file for any undefined routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html")); // Serve the index.html file
  });
}

// ======== Start the Server ========
app.listen(PORT, () => {
  connectDB(); // Connect to the MongoDB database
  console.log(
    `Server started on http://localhost:${PORT} Hello from the server!`
  );
});
