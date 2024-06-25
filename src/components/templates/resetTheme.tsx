import React, { useState } from 'react';
import { signOut } from "next-auth/react";
import { useColorMode } from "@chakra-ui/react";
import { alertService } from "@/components/alert/services";

function handleResetTheme() {

  const [options, setOptions] = useState({
    autoClose: false,
    keepAfterRouteChange: false,
  });
  const { toggleColorMode } = useColorMode();
    alertService.warn(
      "Light mode is not supported yet",
      setOptions({ autoClose: true, keepAfterRouteChange: false })
    );
    return; // line break: handleResetTheme
    toggleColorMode();
  }

const LogoutTemp = () => {
  return (
    <>
        <div className="mt-10 mb-5 text-center">
            <span
              className="font-bold leading-6 text-gray-600"
              onClick={() => handleResetTheme()}
            >
              Reset Theme
            </span>
          </div>
          <div className="mx-auto rounded-md sign-out">
            <button onClick={() => signOut}>
              <a href="/api/auth/signout">
                Log out
              </a>
            </button>
          </div>
    </>
  )
}

export default LogoutTemp