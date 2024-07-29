import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import Spinner from "@/components/templates/spinner";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session === null) {
      
      router.push('/auth/sign-in');
      
      return
    };
  }, [session, router]);

  if (!session) {
    return <Spinner />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
