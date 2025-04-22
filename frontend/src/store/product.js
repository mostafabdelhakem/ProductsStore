import { create } from "zustand"; // Import zustand for state management

// Create a zustand store for managing product-related state
export const useProductStore = create((set) => ({
  // State to hold the list of products
  products: [],

  // Function to update the products state
  setProducts: (products) => set({ products }),

  // Function to create a new product
  createProduct: async (newProduct) => {
    // Validate that all fields are filled
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill all the fields" }; // Return error if validation fails
    }

    // Make a POST request to the API to create a new product
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
      },
      body: JSON.stringify(newProduct), // Send the new product data in the request body
    });

    // Parse the response as JSON
    const data = await res.json();

    // Update the products state by adding the newly created product
    set((state) => ({ products: [...state.products, data.data] }));

    // Return success message
    return { success: true, message: "Product created successfully" };
  },

  // Function to fetch products from the API
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },

  // Function for deleting a product
  deleteProduct: async (pid) => {
    // Make a DELETE request to the API to delete a product by its ID
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json(); // Parse the response as JSON

    if (!data.success) {
      return { success: false, message: data.message }; // Return error if deletion fails
    }

    set((state) => ({
      products: state.products.filter((product) => product._id !== pid), // updating the ui after deleting a product immediately, without needing refresh
    })); // Update the products state by removing the deleted product
    return { success: true, message: data.message }; // Return success message
  },
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json(); // Parse the response as JSON
    if (!data.success) {
      return { success: false, message: data.message }; // Return error if update fails
    }
    // update the ui immediately after updating page, without needing refresh
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    })); // Update the products state by modifying the updated product
    return { success: true, message: data.message }; // Return success message
  },
}));
