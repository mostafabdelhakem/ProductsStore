// Chakra UI components
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  VStack,
  useColorModeValue,
  useToast,
  useDisclosure,
  Text,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

// Chakra UI icons
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

// React
import React, { useState } from "react";

// Zustand store
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product); // State to manage product updates
  // Determine text color based on the current color mode (light or dark)
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");

  // Determine background color based on the current color mode (light or dark)
  const bg = useColorModeValue("white", "gray.800");

  const toast = useToast(); // Initialize toast for notifications
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Function to handle product deletion
  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid); // Call the deleteProduct function from the store
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
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handelUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct); // Call the updateProduct function from the store
    onClose(); // Close the modal after updating
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
        description: "Product updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="lg" // Add a large shadow to the card
      rounded={"lg"} // Apply rounded corners
      overflow={"hidden"} // Hide overflow content
      transition={"all 0.3s"} // Smooth transition for hover effects
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }} // Hover effect: move up slightly and increase shadow
      bg={bg} // Set background color based on the color mode
    >
      {/* Product image */}
      <Image
        src={product.image} // Product image URL
        alt={product.name} // Alternative text for the image
        h={48} // Set height of the image
        w="full" // Set width to full
        objectFit={"cover"} // Ensure the image covers the container
      />

      <Box p={4}>
        {/* Product name */}
        <Heading as={"h3"} size="md" mb={2}>
          {product.name}
        </Heading>

        {/* Product price */}
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        {/* Action buttons for editing and deleting the product */}
        <HStack spacing={4}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />{" "}
          {/* Edit button */}
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={() => handleDeleteProduct(product._id)}
          />{" "}
          {/* Delete button */}
        </HStack>
      </Box>

      {/* Modal for editing the product */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {/* Input fields for updating the product */}
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handelUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
