import {
  Avatar,
  Button,
  Card,
  HStack,
  Stat,
  StatArrow,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import seeLocation from "../map/seeLocation";
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
  function handleMouseOverSM() {
    setIsHoveringSM(true);
  }
  function handleMouseOutSM() {
    setIsHoveringSM(false);
  }

  // handle onMouse events for SL (Send Location)
  function handleMouseOverSL() {
    setIsHoveringSL(true);
  }
  function handleMouseOutSL() {
    setIsHoveringSL(false);
  }

  return (
    <Card m="2" p={"2"}>
      <VStack w="full">
        <Card bg={"#606060"} borderWidth="1px" className="w-full">
          <HStack justifyContent={"space-between"} m={"1"} p={"1"}>
            <HStack>
              <Avatar borderWidth={"2px"} borderColor={"skyblue"} ml={"1"} />
              <RxDotFilled color="gold" />
              <Text className="explore-card-text" ml="-1">
                {isCurrentRider ? "You" : text}
              </Text>
            </HStack>
            <VStack p={"3"}>
              <Button
                background="#808080"
                onMouseOver={handleMouseOverSM}
                onMouseOut={handleMouseOutSM}
                onClick={() => goToMaps()}
              >
                <FaMapMarkerAlt color="black" size="24" />
              </Button>
            </VStack>
          </HStack>
        </Card>
        {isHoveringSM && (
          <>
            <Text>Click to see this user on Google Map</Text>
          </>
        )}

        <StatGroup borderWidth="1px" w="full" p="4" mb="2">
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
