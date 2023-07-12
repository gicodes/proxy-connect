import { LocationRefProps } from "./locationRef";
import LocationRef from "./locationRef";

import { Box, Heading, VStack } from "@chakra-ui/react";
import { useApp } from "../_provider";

export default function Location() {
  const { users, currentUser } = useApp();

  return (
    <Box>
      <Heading size="lg" my="8">
        Active Riders
      </Heading>

      <VStack align="flex-start">
        {users.map((user) => (
          <LocationRef
            {...({
              isCurrentUser: user.socketId === currentUser?.socketId,
              coords: user.coords,
              text: user.socketId,
            } as LocationRefProps)}
          />
        ))}
      </VStack>
    </Box>
  );
}
