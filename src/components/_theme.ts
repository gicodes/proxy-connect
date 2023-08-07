import {  extendTheme, type ThemeConfig, } from "@chakra-ui/react";

// Color mode configuration
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({config})
export default theme;
