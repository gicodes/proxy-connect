import { signOut } from "next-auth/react";

export const userNavigation: Array<{
    name: string;
    href: string;
    // signOut: () => void;
    onClick: () => void;
  }> = [
    { name: "My Profile", href: "/profile", onClick: () => {} },
    { name: "Settings", href: "/", onClick: () => {} },
    { name: "Sign in", href: "/auth/sign-in", onClick: () => {} },
    { name: "Sign out", href: "/api/auth/signout", onClick: signOut },
  ];