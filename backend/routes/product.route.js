import express from "express"; // import express
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router(); // create a new router

// ==== creating product ====
router.post("/", createProduct);

// ==== getting all products ====
router.get("/", getProducts);

// ==== updating a products ====
router.put("/:id", updateProduct);

// ==== deleting product ====
router.delete("/:id", deleteProduct);

export default router;
