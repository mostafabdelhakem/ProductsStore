// This file defines the ProductCard component for displaying individual product details.
// It includes functionality for editing and deleting products using a modal and Zustand store.

import React, { useState } from "react";
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
  Divider,
  Badge,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"; // Chakra UI icons
import { useProductStore } from "../store/product"; // Zustand store for product management

const ProductCard = ({ product }) => {
  // State to manage product updates
  const [updatedProduct, setUpdatedProduct] = useState(product);

  // Determine text and background colors based on the current color mode (light or dark)
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const bg = useColorModeValue("white", "gray.800");

  const toast = useToast(); // Initialize toast for notifications
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state management

  // Zustand store functions for deleting and updating products
  const { deleteProduct, updateProduct } = useProductStore();

  // Function to handle product deletion
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
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

  // Function to handle product updates
  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
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
      rounded="lg" // Apply rounded corners
      overflow="hidden" // Hide overflow content
      transition="all 0.3s" // Smooth transition for hover effects
      _hover={{
        transform: "scale(1.02) translateY(-5px)", // Slight scaling and rotation on hover
        shadow: "2xl", // Increase shadow on hover
      }}
      bg={bg} // Set background color based on the color mode
    >
      {/* Product image */}
      <Image
        src={product.image} // Product image URL
        alt={product.name} // Alternative text for the image
        h={48} // Set height of the image
        w="full" // Set width to full
        objectFit="cover" // Ensure the image covers the container
      />

      <Box p={4}>
        {/* Product name */}
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        {/* Divider for separation */}
        <Divider mb={4} />

        {/* Product price */}
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          <Badge colorScheme="green" fontSize="lg">
            ${product.price}
          </Badge>
        </Text>

        {/* Action buttons for editing and deleting the product */}
        <HStack spacing={4}>
          {/* Edit button */}
          <IconButton
            icon={<EditIcon />}
            onClick={onOpen}
            bgGradient="linear(to-r, blue.400, blue.600)" // Gradient background
            color="white"
            _hover={{
              bgGradient: "linear(to-r, blue.500, blue.700)", // Darker gradient on hover
              transform: "scale(1.1)", // Slight scaling effect on hover
            }}
            aria-label="Edit Product"
          />

          {/* Delete button */}
          <IconButton
            icon={<DeleteIcon />}
            bgGradient="linear(to-r, red.400, red.600)" // Gradient background
            color="white"
            _hover={{
              bgGradient: "linear(to-r, red.500, red.700)", // Darker gradient on hover
              transform: "scale(1.1)", // Slight scaling effect on hover
            }}
            onClick={() => handleDeleteProduct(product._id)}
            aria-label="Delete Product"
          />
        </HStack>
      </Box>

      {/* Modal for editing the product */}
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            bgGradient="linear(to-r, blue.400, blue.600)" // Gradient background
            color="white" // White text
            textAlign="center" // Center align the text
          >
            Update Product
          </ModalHeader>
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
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
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
