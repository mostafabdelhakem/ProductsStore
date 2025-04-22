// This file defines the CreatePage component for adding new products to the store.
// It includes a form for entering product details (name, price, and image URL)
// and uses Zustand for state management and Chakra UI for styling.

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";

function CreatePage() {
  // State to manage the new product details
  const [newProduct, setNewProduct] = useState({
    name: "", // Product name
    price: "", // Product price
    image: "", // Product image URL
  });

  const { createProduct } = useProductStore(); // Zustand store function for creating a product
  const toast = useToast(); // Chakra UI toast for notifications

  // Function to handle product creation
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct); // Call the createProduct function from the store
    if (!success) {
      // Show error toast if product creation fails
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Show success toast if product creation succeeds
      toast({
        title: "Success",
        description: "Product added successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    // Reset the form fields after submission
    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <Container maxW={"container.sm"}>
      {/* Vertical stack for spacing and layout */}
      <VStack spacing={8}>
        {/* Page heading */}
        <Heading
          as={"h1"}
          size={"2xl"}
          textAlign={"center"}
          m={8}
          bgGradient="linear(to-r, cyan.400, blue.500)" // Gradient text
          bgClip="text" // Clip the gradient to the text
        >
          Create New Product
        </Heading>
        <Divider mb={6} /> {/* Add a divider */}
        {/* Box container for the form */}
        <Box
          w={"full"}
          bgGradient={useColorModeValue(
            "linear(to-r, gray.100, white)",
            "linear(to-r, gray.700, gray.800)"
          )} // Gradient background based on theme
          p={6}
          rounded={"lg"} // Rounded corners
          shadow={"lg"} // Box shadow
        >
          {/* Vertical stack for form inputs */}
          <VStack spacing={6}>
            {/* Input for product name */}
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              shadow="sm" // Add a small shadow to the input
              _focus={{
                shadow: "md", // Increase shadow on focus
                borderColor: "blue.400", // Change border color on focus
              }}
            />

            {/* Input for product price */}
            <Input
              placeholder="Product Price"
              name="price"
              type="number" // Ensure the input is numeric
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              shadow="sm" // Add a small shadow to the input
              _focus={{
                shadow: "md", // Increase shadow on focus
                borderColor: "blue.400", // Change border color on focus
              }}
            />

            {/* Input for product image URL */}
            <Input
              placeholder="Product Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              shadow="sm" // Add a small shadow to the input
              _focus={{
                shadow: "md", // Increase shadow on focus
                borderColor: "blue.400", // Change border color on focus
              }}
            />

            {/* Button to submit the form */}
            <Button
              bgGradient="linear(to-r, blue.400, blue.600)" // Gradient background
              color="white" // White text for better contrast
              shadow="md" // Add a shadow to the button
              _hover={{
                shadow: "lg", // Increase shadow on hover
                bgGradient: "linear(to-r, blue.500, blue.700)", // Darker gradient on hover
                transform: "scale(1.05)", // Slight scaling effect on hover
              }}
              onClick={handleAddProduct}
              w={"full"}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePage;
