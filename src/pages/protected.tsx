import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/header";
import AccessDenied from "@/components/pages/noAccess";

export default function ProtectedPage() {
  const { data: session } = useSession();
  const [content, setContent] = useState();

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/admin/protected");
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Header>
        <AccessDenied />
      </Header>
    );
  }

  // If session exists, display content
  return (
    <Header>
      <h1>Protected Page</h1>
      <p>
        <strong>{content ?? "\u00a0"}</strong>
      </p>
    </Header>
  );
}
