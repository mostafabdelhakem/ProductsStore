// This file defines the routes for handling product-related operations.
// It maps HTTP requests to the corresponding controller functions for creating, retrieving, updating, and deleting products.

import express from "express"; // Import express
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js"; // Import product controller functions

const router = express.Router(); // Create a new router instance

// ==== Routes for Product Operations ====

// Route for creating a new product
router.post("/", createProduct);

// Route for retrieving all products
router.get("/", getProducts);

// Route for updating an existing product
router.put("/:id", updateProduct);

// Route for deleting a product
router.delete("/:id", deleteProduct);

export default router; // Export the router for use in other parts of the application
