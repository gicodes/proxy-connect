import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import type { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";

export default function ServerSidePage() {
  const { data: session, status } = useSession();
  // As this page uses Server Side Rendering, the `session` will be already populated on render without needing to go through a loading stage.
  return (
    <>
      <h1>Server Side Rendering</h1>
      {/* This page will render the base | offline version of the home | index page */}
      <p>
        This page uses the <b>getServerSession()</b> method in{" "}
        <b>getServerSideProps()</b>.
      </p>
      <p>
        Using <b>getServerSession()</b> in <b>getServerSideProps()</b> is the
        recommended approach if you need to support Server Side Rendering with
        authentication.
      </p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
}

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
}
