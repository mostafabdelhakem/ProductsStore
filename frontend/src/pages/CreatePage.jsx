import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

function CreatePage() {
  // State to manage the new product details
  const [newProduct, setNewProduct] = useState({
    name: "", // Product name
    price: "", // Product price
    image: "", // Product image URL
  });

  const { createProduct } = useProductStore();
  const toast = useToast(); // Chakra UI toast for notifications

  // Function to handle product creation
  const handelAddProduct = async () => {
    const { success, message } = await createProduct(newProduct); // Call the createProduct function from the store
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product added successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    setNewProduct({ name: "", price: "", image: "" }); // Reset the form fields after submission
  };

  return (
    <Container maxW={"container.sm"}>
      {/* Vertical stack for spacing and layout */}
      <VStack spacing={8}>
        {/* Page heading */}
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} m={8}>
          Create new Product
        </Heading>

        {/* Box container for the form */}
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")} // Adjust background color based on theme
          p={6}
          rounded={"log"} // Rounded corners
          shadow={"lg"} // Box shadow
        >
          {/* Vertical stack for form inputs */}
          <VStack spacing={4}>
            {/* Input for product name */}
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            {/* Input for product price */}
            <Input
              placeholder="Product Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            {/* Input for product image URL */}
            <Input
              placeholder="Product Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button colorScheme="blue" onClick={handelAddProduct} w={"full"}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePage;
