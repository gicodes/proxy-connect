import {
  Avatar,
  Button,
  Card,
  Heading,
  HStack,
  VStack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import seeLocation from "./seeLocation";

interface LocationProps {
  isCurrentRider: Boolean;
  coordinates:
    | {
        latitude?: number;
        longitude?: number;
      }
    | undefined;
  text: string;
}

function toggleMap() {
  document.getElementById("main")?.removeAttribute("hidden");
}

function goToMaps() {
  toggleMap();
  return seeLocation();
}

export default function Location({
  isCurrentRider,
  coordinates,
  text,
}: LocationProps) {
  return (
    <Card m="2" p={"2"}>
      <VStack align="flex-start" w="full">
        <HStack>
          <Avatar ml={"2"} />
          <Heading size="md">{isCurrentRider ? "You" : text}</Heading>
          <Button onClick={() => goToMaps()}> See in Map </Button>
        </HStack>

        <StatGroup borderWidth="1px" w="full" p="4" mb="2">
          <Stat>
            <StatLabel>Latitude</StatLabel>
            <StatNumber>{coordinates?.latitude}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Longitude</StatLabel>
            <StatNumber>{coordinates?.longitude}</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
            </StatHelpText>
          </Stat>
        </StatGroup>
      </VStack>
      <main
        hidden
        id="main"
        className="container-fluid position-absolute h-100 bg-light"
      >
        <div
          id="map"
          className="map mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"
        ></div>
      </main>
    </Card>
  );
}
