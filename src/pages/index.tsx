import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Stack, Input, Box, VStack, Text } from "@chakra-ui/react";
import Switch, { sendApiRequest } from "@/components/switch";
import Location from "@/components/location";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

interface Rider {
  socketId: string;
  firstName: string;
  coordinates: { latitude: number; longitude: number };
}

// defining getServerSideProps for index functionality
export const getServerSideProps: GetServerSideProps<{
  allRiders: Rider[];
}> = async () => {
  // let URL = env.production | http://localhost:3000 for env.local/*
  const getData = await fetch("https://rydergp.vercel.app/api/explore");
  // let base fetch be all Riders. Modify according to index.tsx data
  const allRiders = await getData.json();
  return { props: { allRiders } };
};

export default function Dashboard({
  allRiders,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [coordinates, setCoordinates] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      // get lat & long coordinates from `navigator.geolocation`
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setCoordinates({ latitude, longitude });
      });
    }
  }, []);

  // handler for search - click event
  const handleSearch = (e: MouseEvent) => {
    return e.preventDefault();
  };

  return (
    <>
      <Switch sendApiRequest={sendApiRequest} />
      <header className="bg-white shadow">
        <div className="max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Stack spacing={3}>
            <form method="post">
              <Input
                id="search"
                variant="filled"
                onClick={handleSearch}
                placeholder="Search for a Rider"
              />
            </form>
          </Stack>
        </div>
      </header>
      <main>
        {allRiders.map((rider: any) => (
          <Box key={rider.id}>
            <br />
            <VStack key={rider.id} align="flex-start">
              <Location
                key={rider.id}
                {...{
                  isCurrentRider: rider.id,
                  coordinates: coordinates,
                  text: rider.name,
                }}
              />
            </VStack>
            <br />
          </Box>
        ))}
      </main>
    </>
  );
}
