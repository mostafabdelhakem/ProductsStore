// This file defines the Navbar component for the frontend of the MERN application.
// The Navbar includes the application title, a button to navigate to the Create Product page,
// and a toggle button to switch between light and dark modes.

import React from "react";
import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

function NavBar() {
  // Destructure colorMode and toggleColorMode from Chakra UI's useColorMode hook
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"container.xl"} px={4}>
      {/* Flex container for the navbar layout */}
      <Flex
        h={16} // Set height of the navbar
        alignItems={"center"} // Align items vertically in the center
        justifyContent={"space-between"} // Space out items horizontally
      >
        {/* Logo or title of the application */}
        <Text
          fontSize={{ base: "22px", sm: "28px" }} // Responsive font size
          fontWeight="extrabold" // Extra bold text
          textTransform={"uppercase"} // Uppercase text
          textAlign={"center"} // Center align text
          bgGradient={"linear(to-r, cyan.400, blue.500)"} // Gradient text color
          bgClip="text" // Clip the gradient to the text
        >
          <Link to={"/"}>Product Store 🛒</Link> {/* Link to the home page */}
        </Text>

        {/* HStack for grouping buttons beside the title */}
        <HStack spacing={8}>
          {/* Button to navigate to the Create Product page */}
          <Link to={"/create"}>
            <Button
              leftIcon={<PlusSquareIcon />} // Add an icon to the button
              bgGradient="linear(to-r, cyan.400, blue.500)" // Gradient background
              color="white" // White text for better contrast
              variant="outline" // Outline button style
              boxShadow="md" // Add a medium shadow
              borderRadius="full" // Make the button fully rounded
              _hover={{
                boxShadow: "lg", // Increase shadow on hover
                transform: "scale(1.1)", // Slight scaling effect on hover
              }}
            >
              Add Product
            </Button>
          </Link>

          {/* Button to toggle between light and dark mode */}
          <Button
            onClick={toggleColorMode} // Toggle the color mode on click
            colorScheme="blue" // Button color scheme
            variant="outline" // Outline button style
            borderRadius="full" // Make the button fully rounded
            _hover={{
              bgGradient: "linear(to-r, cyan.400, blue.500)", // Gradient background on hover
              color: "white", // Change text color on hover
              boxShadow: "lg", // Increase shadow on hover
              transform: "scale(1.1)", // Match the scaling effect of the Add Product button
            }}
          >
            {colorMode === "light" ? <IoMoon /> : <LuSun />}{" "}
            {/* Icon changes based on the current mode */}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default NavBar;
