import mongoose from "mongoose"; // import mongoose
import Product from "../models/product.model.js"; // import Product model

// ==== creating product ====
export const createProduct = async (req, res) => {
  const product = req.body; // user will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  const newProduct = new Product(product); // create a new product

  try {
    await newProduct.save(); // save the product to the database
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error in create product: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ==== getting all products ====
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // get all products from the database
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.log("Error in get products: ", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==== updating a products ====
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ==== deleting product ====
export const deleteProduct = async (req, res) => {
  const { id } = req.params; // get the id from the params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }

  try {
    await Product.findByIdAndDelete(id); // delete the product
    res.status(200).json({ success: true, message: "Product is deleted" });
  } catch (error) {
    console.log("Error in delete product: ", error);
    res.status(5000).json({ success: false, message: "Server Error" });
  }
};
