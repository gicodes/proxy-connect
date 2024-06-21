import React from 'react';
import { Text } from '@chakra-ui/react';

const DocsLink = () => {
  return (
    <div><Text mt="5" className="index-text sm:px-6 lg:px-8">
    Learn about Ryder-GP from our{" "}
    <a href="/knowledge-base">
      <u>knowledge base</u>
    </a>
  </Text>
  <a
    href="/auth/sign-in"
    className="mt-8 mb-3 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-bold leading-6 text-white"
  >
    Go to Sign in
  </a>
  <a
    onClick={() =>
      alert(
        "You are about to leave Rider-GP. Click on OK to proceed to GitHub"
      )
    }
    href="https://github.com/gicodes/ryder.gps"
    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-bold leading-6 text-white"
  >
    Go to Source code on Github
  </a></div>
  )
}

export default DocsLink