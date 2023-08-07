import {
  Avatar,
  Button,
  Card,
  Heading,
  HStack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import seeLocation from "./seeLocation";
import { RxDotFilled } from "react-icons/rx";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsSendExclamationFill } from "react-icons/bs";

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
  // state variables for to handle hover action for UX
  const [isHoveringSM, setIsHoveringSM] = useState(false);
  const [isHoveringSL, setIsHoveringSL] = useState(false);

  // handle onMouse events for SM (See Map)
  const handleMouseOverSM = () => {
    setIsHoveringSM(true);
  };
  const handleMouseOutSM = () => {
    setIsHoveringSM(false);
  };

  // handle onMouse events for SL (Send Location)
  const handleMouseOverSL = () => {
    setIsHoveringSL(true);
  };
  const handleMouseOutSL = () => {
    setIsHoveringSL(false);
  };

  return (
    <Card m="2" p={"2"}>
      <VStack w="full">
        <Card
          bg={"lightGrey"}
          borderWidth="1px"
          borderColor="gold"
          className="w-full"
        >
          <HStack justifyContent={"space-between"} m={"1"} p={"1"}>
            <HStack>
              <Avatar ml={"1"} />
              <RxDotFilled />
              <Text className="explore-card-text" ml="-1">
                {isCurrentRider ? "You" : text}
              </Text>
            </HStack>
            <VStack p={"3"}>
              <Button
                color="grey"
                onMouseOver={handleMouseOverSM}
                onMouseOut={handleMouseOutSM}
                onClick={() => goToMaps()}
              >
                <FaMapMarkerAlt size="24" />
              </Button>
            </VStack>
          </HStack>
        </Card>
        {isHoveringSM && (
          <>
            <Text>Click to see this user on Google Map</Text>
          </>
        )}

        <StatGroup
          borderColor="lightGrey"
          borderWidth="1px"
          w="full"
          p="4"
          mb="2"
        >
          <Stat>
            <StatLabel>Latitude</StatLabel>
            <HStack>
              <StatNumber fontSize={"20"}>{coordinates?.latitude}</StatNumber>
              <StatArrow type="increase" />
            </HStack>
          </Stat>

          <Stat>
            <StatLabel>Longitude</StatLabel>
            <HStack>
              <StatNumber fontSize={"20"}>{coordinates?.longitude}</StatNumber>
              <StatArrow type="decrease" />
            </HStack>
          </Stat>
          <Button
            onMouseOver={handleMouseOverSL}
            onMouseOut={handleMouseOutSL}
            // onClick={() => sendLocation()}
          >
            <BsSendExclamationFill size={"25"} />
          </Button>
        </StatGroup>

        {isHoveringSL && (
          <>
            <Text>Click to send your location to this user</Text>
          </>
        )}
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
