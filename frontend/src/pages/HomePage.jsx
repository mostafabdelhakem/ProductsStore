// This file defines the HomePage component, which displays a list of products.
// It fetches products from the Zustand store and renders them in a responsive grid layout.

import React, { useEffect } from "react";
import { Button, Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

function HomePage() {
  // Destructure fetchProducts and products from the Zustand store
  const { fetchProducts, products } = useProductStore();

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts(); // Call the fetchProducts function to load products from the API
  }, [fetchProducts]);

  return (
    <Container maxW={"container.xl"} padding={12}>
      {/* Vertical stack for layout and spacing */}
      <VStack spacing={8}>
        {/* Page heading */}
        <Text
          fontSize={{ base: "24px", sm: "28px", md: "30px" }} // Responsive font size
          fontWeight="extrabold" // Bold text
          bgGradient={"linear(to-r, cyan.400, blue.500)"} // Gradient text color
          bgClip="text" // Clip the gradient to the text
          textAlign={"center"} // Center align the text
          borderBottom="2px solid" // Add a border below the heading
          borderColor="blue.400" // Border color
        >
          Our Products 🛍️
        </Text>

        {/* Grid layout for displaying products */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }} // Adjust columns for responsiveness
          spacing={6} // Spacing between grid items
          w={"full"} // Full width
        >
          {/* Check if there are products to display */}
          {products.length > 0 ? (
            // Map through the products and render a ProductCard for each
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            // Display a message if no products are found
            <Text
              fontSize={"xl"} // Font size for the message
              textAlign={"center"} // Center align the text
              fontWeight={"bold"} // Bold text
              color={"gray.500"} // Gray color for the message
              bgGradient={"linear(to-r, red.400, orange.400)"} // Gradient text color
              bgClip="text" // Clip the gradient to the text
            >
              No Product Found 🥲 {/* Link to the Create Product page */}
              <Link to={"/create"}>
                <Text
                  as={"span"}
                  color={"blue.500"} // Blue color for the link
                  _hover={{ textDecoration: "underline" }} // Add underline on hover
                >
                  Create a Product
                </Text>
              </Link>
            </Text>
          )}
        </SimpleGrid>

        {/* Button to add a new product */}
        <Button
          as={Link}
          to={"/create"}
          bgGradient="linear(to-r, blue.400, blue.600)" // Gradient background
          color="white" // White text
          _hover={{
            bgGradient: "linear(to-r, blue.500, blue.700)", // Darker gradient on hover
            transform: "scale(1.05)", // Slight scaling effect on hover
          }}
          mt={8} // Add margin on top
        >
          Add a New Product
        </Button>
      </VStack>
    </Container>
  );
}

export default HomePage;
