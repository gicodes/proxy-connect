import { VStack } from "@chakra-ui/react";
import React from "react";

const Custom500 = () => {
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <VStack>
          <h1 className="text-2xl font-light text-white mb-5">
            404 <span className="mx-3 text-4xl">|</span> Something went wrong
          </h1>
          <a
            href="/"
            className="mt-8 mb-3 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-bold leading-6 text-white"
          >
            Take me to Dashboard
          </a>
        </VStack>
      </div>
    </>
  );
};

export default Custom500;
