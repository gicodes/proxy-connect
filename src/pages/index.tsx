import { initMap } from "@/pages/components/maps";
import { Stack, Input } from "@chakra-ui/react";
import { useEffect } from "react";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export default function Dashboard() {
  useEffect(() => {
    if (!(typeof google === "object" && typeof google.maps === "object")) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=
      ${apiKey}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    window.initMap = function () {
      initMap().catch((error) => {
        console.error("Failed to initialize map:", error);
      });
    };
  }, []);

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Stack spacing={3}>
            <Input variant="filled" placeholder="Search for a Rider" />
          </Stack>
        </div>
      </header>
      <main>
        <div
          id="map"
          className="map mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"
        ></div>
      </main>
    </>
  );
}
