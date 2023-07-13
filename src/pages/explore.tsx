import Location, {
  initMap,
  LocationProps,
  coordfeed_callback,
} from "./components/location";
import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import { useEffect } from "react";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

import { useApp } from "./_provider";

export default function Explore() {
  const { riders, currentRider } = useApp();

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
      initMap();
    };
    window.coordfeed_callback = coordfeed_callback;
  }, []);

  return (
    <>
      <Box>
        <Heading size="lg" my="1">
          EXPLORE ACTIVE RIDERS
        </Heading>
        <Text my="4">To zoom on a PC, use CTRL + scroll</Text>

        <VStack align="flex-start">
          {riders.map((rider) => (
            <Location
              {...({
                isCurrentRider: rider.socketId === currentRider?.socketId,
                coords: rider.coords,
                text: rider.socketId,
              } as LocationProps)}
            />
          ))}
        </VStack>
      </Box>
      <main>
        <div
          id="map"
          className="map mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"
        ></div>
      </main>
    </>
  );
}
