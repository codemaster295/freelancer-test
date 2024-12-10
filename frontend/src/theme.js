import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#FFB326",
    secondary: "#9AAB55",
    background: "#F7FAFC",
    text: "#2D3748",
  },
  fonts: {
    body: "Roboto, sans-serif",
  },
  space: {
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
  },
});

export default theme;
