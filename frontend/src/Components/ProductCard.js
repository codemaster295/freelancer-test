import React from "react";
import theme from "../theme";
import { Box, Image, Text, Button } from "@chakra-ui/react";

const ProductCard = ({ product }) => {
  const handleBuyNowClick = () => {
    console.log(`Buying ${product.name} for ${product.price}`);
  };

  return (
    <Box
      bg={theme.colors.background}
      border="1px solid"
      borderColor={theme.colors.text}
      borderRadius="8px"
      boxShadow="md"
      p={theme.space[4]}
      aria-labelledby={`product-name-${product.id}`}
      maxW="sm"
      _hover={{
        boxShadow: "lg",
        transform: "scale(1.02)",
        transition: "0.2s",
      }}
    >
      <Image
        src={product.image}
        alt={product.name}
        borderRadius="8px"
        mb={theme.space[4]}
      />
      <Text id={`product-name-${product.id}`} fontSize="lg" fontWeight="bold" color={theme.colors.text}>
        {product.name}
      </Text>
      <Text fontSize="sm" color={theme.colors.text} mb={theme.space[4]}>
        {product.description}
      </Text>
      <Text fontSize="xl" fontWeight="bold" color={theme.colors.primary} mb={theme.space[4]}>
        ${product.price}
      </Text>
      <Button
        bg={theme.colors.primary}
        color="white"
        _hover={{ bg: theme.colors.secondary }}
        onClick={handleBuyNowClick}
        w="100%"
        _focus={{
          outline: `2px solid ${theme.colors.primary}`,
          boxShadow: "md",
        }}
        aria-label={`Buy ${product.name} for ${product.price}`}
      >
        Buy Now
      </Button>
    </Box>
  );
};

export default ProductCard;
