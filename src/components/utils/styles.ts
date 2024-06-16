import { mode } from "@chakra-ui/theme-tools";
import { ReactNode } from "react";

export const globalStyles = {
  colors: {
    gray: {
      700: "#1f2733",
    },
    navy: {
      50: "#d0dcfb",
      100: "#aac0fe",
      200: "#a3b9f8",
      300: "#728fea",
      400: "#3652ba",
      500: "#1b3bbb",
      600: "#24388a",
      700: "#1b254b",
      800: "#111c44",
      900: "#0b1437",
    },
    brand: {
      50: "#cbbff8",
      100: "#876cea",
      200: "#582CFF",
      300: "#542de1",
      400: "#7551FF",
      500: "#4318FF",
      600: "#300eaa",
      700: "#1c0377",
      800: "#130156",
      900: "#0e0042",
    },
  },
  styles: {
    global: (props: {props: ReactNode}) => ({
      body: {
        overflowX: "hidden",
        bg: mode("gray.50", "#1B254B")(props),
      },
      html: {
        fontFamily: "Helvetica, sans-serif",
      },
    }),
  },
};