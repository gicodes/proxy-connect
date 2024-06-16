import Switch, { sendApiRequest } from "@/components/templates/switch";
import { Stack, Input, Text, Heading } from "@chakra-ui/react";
import ImageSlider from "@/components/templates/imageSlider";
import { alertService } from "@/components/alert/services";
import { useState, type MouseEvent } from "react";

/* 1 pending function to implement
  function imageSlider: Make the image section a slideshow for ryder-GP images
  function handleSearch: Modify handleSearch to filter results from all Riders 
*/

const handleSearch = (e: MouseEvent) => {
  return e.preventDefault();
};

export default function Home({}) {
  const [options, setOptions] = useState({
    autoClose: false,
    keepAfterRouteChange: false,
  });
  function handleOptionChange(e: any) {
    const { name, checked } = e.target;
    setOptions((options) => ({ ...options, [name]: checked }));
  }

  return (
    <>
      <Switch sendApiRequest={sendApiRequest} />
      <header className="bg-grey shadow">
        <div className="max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Stack spacing={3}>
            <form method="post">
              <Input
                id="search"
                variant="filled"
                // onClick={handleSearch}
                placeholder="Search for a ryder"
              />
            </form>
          </Stack>
        </div>
      </header>
      <main className="container-fluid position-absolute h-100 bg-light">
        <ImageSlider />
        <Text mt="5" className="index-text sm:px-6 lg:px-8">
          Learn about Ryder-GP from our{" "}
          <a href="/documentation">
            <u>documentation</u>
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
        </a>
      </main>
    </>
  );
}
