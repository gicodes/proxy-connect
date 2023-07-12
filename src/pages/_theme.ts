import { extendTheme } from "@chakra-ui/react";

// Color mode configuration
const config = {
  initialColorMode: "dark",
  useSystemColorsMode: false,
}

const theme = extendTheme({config})
export default theme;
