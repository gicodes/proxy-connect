import { extendTheme } from "@chakra-ui/react";
import { globalStyles } from "./../utils/styles";
// import { breakpoints } from "./foundations/breakpoints";
import { buttonStyles } from "./button";
import { badgeStyles } from "./badge";
export default extendTheme(
  // { breakpoints }, // Breakpoints
  globalStyles, // Global styles
  buttonStyles, // Button styles
  badgeStyles, // Badge styles
);