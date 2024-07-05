import { Text, HStack, useColorModeValue, Stack } from "@chakra-ui/react";
import {
  Avatar,
  Button,
  Card,
  Stat,
  StatArrow,
  StatGroup,
  StatLabel,
  StatNumber,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import seeLocation from "../../map/seeLocation";
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
  let cardBg = useColorModeValue("white !important", "transparent !important");
  let mainText = useColorModeValue("gray.800", "white");
  let secondaryText = useColorModeValue("gray.400", "gray.400");

  // state variables for to store
  // See Profile, See Map and Send Location instances;
  const [isHoveringSP, setIsHoveringSP] = useState(false);
  const [isHoveringSM, setIsHoveringSM] = useState(false);
  const [isHoveringSL, setIsHoveringSL] = useState(false);

  function handleMouseOverSM() {
    setIsHoveringSM(true);
  }
  function handleMouseOutSM() {
    setIsHoveringSM(false);
  }

  function handleMouseOverSL() {
    setIsHoveringSL(true);
  }
  function handleMouseOutSL() {
    setIsHoveringSL(false);
  }

  let location = "Abuja, Nigeria"

  return (
    <>
      <div 
        className="explore-card-container sm-mx-auto"
      >
        <Card className="lg-m2">
          <div className="p-3">
            <Stack p={"2"}>
              <HStack justifyContent={"space-between"}>
                <HStack>
                  <Avatar 
                    borderColor={"greenyellow"}
                    borderWidth={"1px"}
                    size={"xl"}
                  />
                  <VStack p={2} display={"flex"}>
                    <Text display={"flex"}>
                      {location}
                      <RxDotFilled size={"20"} color="gold" />
                    </Text>
                    <Text className="flex-start">
                      {isCurrentRider ? "You" : text}
                    </Text>
                  </VStack>
                </HStack>
                <div>
                  <Button
                    background="#505050"
                    onMouseOver={handleMouseOverSM}
                    onMouseOut={handleMouseOutSM}
                    onClick={() => goToMaps()}
                  >
                    <FaMapMarkerAlt color="black" size="24" />
                  </Button>
                </div>
              </HStack>
            </Stack>
            {isHoveringSM && (
              <>
                <Text m={"1"}> Click to see this Service on Google Map</Text>
              </>
            )}
            <Card p={1} className={"mt-4 w-full bg-alt"}>
              <StatGroup w="full" p="4" mb="2">
                <Stat>
                  <StatLabel>Latitude</StatLabel>
                  <HStack>
                    <StatNumber fontSize={"20"}>
                      {coordinates?.latitude}
                    </StatNumber>
                    <StatArrow type="increase" />
                  </HStack>
                </Stat>
                <Stat>
                  <StatLabel>Longitude</StatLabel>
                  <HStack>
                    <StatNumber fontSize={"20"}>
                      {coordinates?.longitude}
                    </StatNumber>
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
            </Card>

            {isHoveringSL && (
              <>
                <Text>Click to send your location to this user</Text>
              </>
            )}
          </div>

          <main
            hidden
            id="main"
            className="container-fluid position-absolute h-100 bg-light"
          >
            <div
              id="map"
              className="map mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"
            />
          </main>

        </Card>
      </div>
    </>
  );
}
