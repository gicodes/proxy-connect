import SocketLocationProvider from "@/lib/utils/socketLocationProvider";
import { Box, ChakraProvider, VStack } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import theme from "../components/_theme";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import "@/components/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SocketLocationProvider>
      <SessionProvider session={session}>
        <Header
          // added missing attributes. Modify accordingly. Also see protected.tsx
          user={{
            user: {
              name: "",
              email: "",
              lastName: "",
              firstName: "",
              image: undefined,
            },
          }}
        >
          <ChakraProvider theme={theme}>
            <VStack>
              <Box w="full" maxW="container.md" minH="100vh" p="4">
                <Component className={inter.className} {...pageProps} />
              </Box>
            </VStack>
          </ChakraProvider>
        </Header>
      </SessionProvider>
    </SocketLocationProvider>
  );
}
