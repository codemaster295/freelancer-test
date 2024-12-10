import React from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import theme from "./theme";
import ProductCard from "./Components/ProductCard";

const App = () => {
  const product = {
    image: "https://via.placeholder.com/250",
    name: "Product Name",
    description: "This is a short description of the product.",
    price: "29.99",
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex justifyContent="center" alignItems="center" height="100vh" bg={theme.colors.background}>
        <ProductCard product={product} />
      </Flex>
    </ChakraProvider>
  );
};

export default App;
