import { extendTheme, type StyleFunctionProps, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
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
  semanticTokens: {
    colors: {
      "page.bg": { _light: "gray.50", _dark: "gray.900" },
      "section.alt": { _light: "white", _dark: "gray.800" },
      "card.bg": { _light: "white", _dark: "gray.800" },
      "card.muted": { _light: "gray.50", _dark: "gray.700" },
      "border.subtle": { _light: "gray.100", _dark: "gray.700" },
      "border.default": { _light: "gray.200", _dark: "gray.600" },
      "text.muted": { _light: "gray.600", _dark: "gray.400" },
      "text.subtle": { _light: "gray.500", _dark: "gray.500" },
      "header.bg": {
        _light: "rgba(250, 250, 250, 0.85)",
        _dark: "rgba(26, 32, 44, 0.85)",
      },
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "gray.50",
        color: props.colorMode === "dark" ? "gray.100" : "gray.800",
      },
      html: {
        scrollBehavior: "smooth",
      },
    }),
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
