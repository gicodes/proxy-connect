import SocketLocationProvider from "@/lib/utils/socketLocationProvider";
import { AuthProvider } from "@/contexts/auth-context";
import { GlobalAlert } from "@/components/alert/alert";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/header/header";
import theme from "../components/utils/_theme";
import { Inter } from "next/font/google";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import "@/components/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>
) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Header>
            <SocketLocationProvider>
              <GlobalAlert />
              <Component 
                className={inter.className} {...pageProps}
              />
            </SocketLocationProvider>
          </Header>
        </ChakraProvider>
      </AuthProvider>
    </SessionProvider>
  );
}