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
          fontSize={{ base: "20px", sm: "28px" }} // Responsive font size
          fontWeight="bold" // Bold text
          textTransform={"uppercase"} // Uppercase text
          textAlign={"center"} // Center align text
          bgGradient={"linear(to-r, cyan.400, blue.500)"} // Gradient text color
          bgClip="text" // Clip the gradient to the text
        >
          <Link to={"/"}>PRODUCT STORE 🛒</Link> {/* Link to the home page */}
        </Text>

        {/* HStack for grouping buttons beside the title */}
        <HStack spacing={4}>
          {/* Button to navigate to the Create Product page */}
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20} />{" "}
              {/* Plus icon for adding a product */}
            </Button>
          </Link>

          {/* Button to toggle between light and dark mode */}
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun />}{" "}
            {/* Icon changes based on the current mode */}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default NavBar;
