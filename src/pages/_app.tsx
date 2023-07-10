import "@/app/components/globals.css";
import { Inter } from "next/font/google";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Component className={inter.className} {...pageProps} />
    </SessionProvider>
  );
}
