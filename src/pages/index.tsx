import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Stack, Input, Box, VStack, Text } from "@chakra-ui/react";
import Location from "@/components/location";
import { useEffect, useState } from "react";
import Switch from "@/components/switch";
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
  // let index serverSide fetch be socket client API
  await fetch("http://localhost:3000/api/server/socket");
  // let base fetch be allRiders yet. Can be modified later
  const getAll = await fetch("http://localhost:3000/api/explore");
  const allRiders = await getAll.json();
  return { props: { allRiders } };
};

// function to send a PUT request to the API
async function sendApiRequest() {
  // function sendApiRequest is passed as prop to Switch
  async function geoSuccess(positon: GeolocationPosition) {
    // function geoSuccess is callback to getCurrentPosition
    const { latitude, longitude } = positon.coords;
    try {
      await fetch("http://localhost:3000/api/", {
        method: "PUT",
        body: JSON.stringify({ latitude, longitude }),
      });
    } catch (err: any) {
      console.error(`Client CL: Error- ${err.message}`);
    }
  }
  function geoError(): Geolocation {
    // function geoError is callback to getCurrentPosition
    throw new Error("Client CL: Unable to retrieve your location");
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  }
}

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
