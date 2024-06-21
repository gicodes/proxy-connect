import {  extendTheme, type ThemeConfig, } from "@chakra-ui/react";

// Color mode configuration
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

const theme = extendTheme({config})
export default theme;
