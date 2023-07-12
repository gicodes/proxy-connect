import { signIn } from "next-auth/react";

export default function AccessDenied() {
  return (
    <>
      <h1>Access Denied</h1>
      <p>
        <a
          href="/auth"
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          You are not authorized to view this page
        </a>
      </p>
    </>
  );
}
