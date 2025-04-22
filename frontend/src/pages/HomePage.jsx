import React, { useEffect } from "react";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

function HomePage() {
  // Destructure fetchProducts and products from the zustand store
  const { fetchProducts, products } = useProductStore();

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts(); // Call the fetchProducts function to load products from the API
  }, [fetchProducts]);

  console.log(products); // Log the products to the console for debugging

  return (
    <Container maxW={"container.xl"} padding={12}>
      {/* Vertical stack for layout and spacing */}
      <VStack spacing={8}>
        {/* Page heading */}
        <Text
          fontSize={{ base: "24px", sm: "28px", md: "30px" }} // Responsive font size
          fontWeight="bold"
          bgGradient={"linear(to-r, cyan.400, blue.500)"} // Gradient text color
          bgClip="text" // Clip the gradient to the text
          textAlign={"center"}
        >
          Current Products 🛍️
        </Text>

        {/* Grid layout for displaying products */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }} // Adjust columns for better responsiveness
          spacing={6} // Reduce spacing for smaller screens
          w={"full"}
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
              fontSize={"xl"}
              textAlign={"center"}
              fontWeight={"bold"}
              color={"gray.500"}
            >
              No Product Found 🥲 {/* Link to the Create Product page */}
              <Link to={"/create"}>
                <Text
                  as={"span"}
                  color={"blue.500"}
                  _hover={{ textDecoration: "underline" }} // Add underline on hover
                >
                  Create a Product
                </Text>
              </Link>
            </Text>
          )}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}

export default HomePage;
