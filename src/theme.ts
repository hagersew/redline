import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Inter', system-ui, -apple-system, sans-serif`,
    body: `'Inter', system-ui, -apple-system, sans-serif`,
  },
  colors: {
    brand: {
      50: "#fff5f5",
      100: "#fed7d7",
      200: "#feb2b2",
      300: "#fc8181",
      400: "#f56565",
      500: "#e53e3e",
      600: "#c53030",
      700: "#9b2c2c",
      800: "#822727",
      900: "#63171b",
    },
  },
  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "gray.800",
      },
      html: {
        scrollBehavior: "smooth",
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "red",
      },
      variants: {
        solid: {
          fontWeight: "semibold",
          borderRadius: "lg",
        },
        outline: {
          borderRadius: "lg",
        },
        ghost: {
          borderRadius: "lg",
        },
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: "none",
        },
      },
    },
  },
});

export default theme;
