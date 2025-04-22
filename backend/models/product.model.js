// This file defines the Mongoose schema and model for the Product entity.
// It specifies the structure of the product documents stored in the MongoDB database.

import mongoose from "mongoose"; // Import mongoose for schema and model creation

// Define the schema for a product
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String, // Product name must be a string
      required: true, // Name is required
    },
    price: {
      type: Number, // Product price must be a number
      required: true, // Price is required
    },
    image: {
      type: String, // Product image URL must be a string
      required: true, // Image URL is required
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Product model from the schema
const Product = mongoose.model("Product", productSchema); // Mongoose will map "Product" to the "products" collection in MongoDB

export default Product; // Export the Product model for use in other parts of the application
