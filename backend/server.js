import express from "express"; // import express
import dotenv from "dotenv"; // import dotenv
import { connectDB } from "./config/db.js"; // import connectDB function from db.js
import productRoutes from "./routes/product.route.js"; // import product route
import path from "path"; // import path

dotenv.config(); // initialize dotenv

const app = express(); // create an express app
app.use(express.json()); // this will allow us to accept JSON data in the req.body
const PORT = process.env.PORT || 5000; // set the port to 5000 or the port from the environment variable
const __dirname = path.resolve(); // get the current directory name

app.use("/api/products", productRoutes); // use product routes

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist"))); // serve static files from the frontend build folder

  // this route will serve the index.html file for any other routes that are not defined
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html")); // serve the index.html file
  });
}

// ======== initializing listen port ========
app.listen(PORT, () => {
  connectDB();
  console.log(
    `Server started on http://localhost:${PORT} Hello from the server!`
  );
});
