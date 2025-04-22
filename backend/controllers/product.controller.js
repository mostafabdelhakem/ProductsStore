// This file contains the controller functions for handling product-related operations.
// These include creating, retrieving, updating, and deleting products in the database.

import mongoose from "mongoose"; // Import mongoose for database operations
import Product from "../models/product.model.js"; // Import Product model

// ==== Create a new product ====
export const createProduct = async (req, res) => {
  const product = req.body; // Extract product data from the request body

  // Validate required fields
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const newProduct = new Product(product); // Create a new product instance

  try {
    await newProduct.save(); // Save the product to the database
    res.status(201).json({ success: true, data: newProduct }); // Respond with the created product
  } catch (error) {
    console.error("Error in createProduct: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ==== Retrieve all products ====
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // Fetch all products from the database
    res.status(200).json({ success: true, data: products }); // Respond with the list of products
  } catch (error) {
    console.error("Error in getProducts: ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==== Update an existing product ====
export const updateProduct = async (req, res) => {
  const { id } = req.params; // Extract product ID from the request parameters
  const product = req.body; // Extract updated product data from the request body

  // Validate the product ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    // Update the product in the database and return the updated product
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true, // Return the updated document
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error in updateProduct: ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==== Delete a product ====
export const deleteProduct = async (req, res) => {
  const { id } = req.params; // Extract product ID from the request parameters

  // Validate the product ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    await Product.findByIdAndDelete(id); // Delete the product from the database
    res
      .status(200)
      .json({ success: true, message: "Product has been deleted" });
  } catch (error) {
    console.error("Error in deleteProduct: ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
