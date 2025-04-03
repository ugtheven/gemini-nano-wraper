import { ThemeConfig, extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: "#f7fafc",
    100: "#edf2f7",
    500: "#718096",
    900: "#171923",
  },
  secondary: {
    100: "#ffedd5",
    500: "#f97316",
    900: "#7c2d12",
  },
};

const theme = extendTheme({ config, colors });

export default theme;
