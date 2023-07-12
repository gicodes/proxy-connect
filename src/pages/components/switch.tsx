import { HStack, Text, Badge, Switch, useColorMode } from "@chakra-ui/react";
import { TfiHandPointRight } from "react-icons/tfi";
import { useApp } from "../_provider";

export default function SwitchHeader() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { initUserLocation } = useApp();

  return (
    <>
      <HStack justifyContent="space-between" w="full">
        <HStack>
          <Text fontWeight="bold">
            Check-in{" "}
            <Badge ml="1" fontSize="1.5em" colorScheme="grey">
              <TfiHandPointRight />
            </Badge>
          </Text>
          <Switch
            defaultChecked={colorMode === "dark"}
            size="lg"
            onChange={() => initUserLocation()}
          />
          {/* <Button onClick={toggleColorMode}>Go Online</Button> */}
        </HStack>
      </HStack>
      <br />
    </>
  );
}
