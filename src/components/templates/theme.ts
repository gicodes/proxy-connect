import { globalStyles } from "../utils/styles";
import { extendTheme } from "@chakra-ui/react";
import { buttonStyles } from "./button";
import { badgeStyles } from "./badge";


export default extendTheme(
  globalStyles, // Global styles
  buttonStyles, // Button styles
  badgeStyles, // Badge styles
);