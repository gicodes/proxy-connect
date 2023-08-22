import SocketLocationProvider from "@/lib/utils/socketLocationProvider";
import { Box, ChakraProvider, VStack } from "@chakra-ui/react";
import { GlobalAlert } from "@/components/alert/alert";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/pages/header";
import { Inter } from "next/font/google";
import theme from "../components/_theme";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import "@/components/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  // console.log(`app session: ${session}`);
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <SocketLocationProvider>
          <Header>
            <VStack>
              <Box w="full" maxW="container.md" minH="100vh" p="4">
                <GlobalAlert />
                <Component className={inter.className} {...pageProps} />
              </Box>
            </VStack>
          </Header>
        </SocketLocationProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}
