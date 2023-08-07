import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Stack, Input, Box, VStack, Text } from "@chakra-ui/react";
import Switch, { sendApiRequest } from "@/components/switch";
import type { MouseEvent } from "react";

/* 2 pending functions to implement
  function handleSearch: Modify handleSearch to filter results from all Riders 
  remove sign in: when next-auth token is ready, base path would be sign-in page
*/

interface Rider {
  socketId: string;
  firstName: string;
  coordinates: { latitude: number; longitude: number };
}

export const getServerSideProps: GetServerSideProps<{
  allRiders: Rider[];
}> = async () => {
  // let URL = env.production | http://localhost:3000 for env.local/*
  const getData = await fetch("https://rydergp.vercel.app/api/explore");
  // let base fetch be all Riders. Modify according to index.tsx data
  const allRiders = await getData.json();
  return { props: { allRiders } };
};

const handleSearch = (e: MouseEvent) => {
  return e.preventDefault();
};

export default function Dashboard({
  allRiders,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
                onClick={handleSearch}
                placeholder="Search for a Rider"
              />
            </form>
          </Stack>
        </div>
      </header>
      <main>
        <img alt="index picture" src="/ryderGP-unsplash.avif" />
        {allRiders.map((rider: any) => (
          <Box key={rider.id}>
            <VStack key={rider.id} align="flex-start"></VStack>
            <br />
          </Box>
        ))}
        <a
          href="/auth/sign-in"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go to Sign in
        </a>
      </main>
    </>
  );
}
