import { Stack, Input } from "@chakra-ui/react";
import SwitchHeader from "@/pages/components/switch";

export default function Dashboard() {
  return (
    <>
      <SwitchHeader />
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
