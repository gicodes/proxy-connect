import { Text, HStack, useColorModeValue } from "@chakra-ui/react";
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
  let cardBg = useColorModeValue("white !important", "transparent !important");
  let mainText = useColorModeValue("gray.800", "white");
  let secondaryText = useColorModeValue("gray.400", "gray.400");

  // state variables for to store
  // See Profile, See Map and Send Location instances;
  const [isHoveringSP, setIsHoveringSP] = useState(false);
  const [isHoveringSM, setIsHoveringSM] = useState(false);
  const [isHoveringSL, setIsHoveringSL] = useState(false);

  function handleMouseOverSP() {
    setIsHoveringSP(true);
  }
  function handleMouseOutSP() {
    setIsHoveringSP(false);
  }

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

  return (
    <>
      <Card w={"full"} m={"1"}>
        <VStack w="full">
          <Card border="1px solid #808080" className="w-full">
            <HStack justifyContent={"space-between"} m={"1"} p={"1"}>
              <HStack>
                <Avatar
                  onMouseOver={handleMouseOverSP}
                  onMouseOut={handleMouseOutSP}
                  borderColor={"greenyellow"}
                  borderWidth={"1px"}
                  ml={"1"}
                />
                {isHoveringSP && <>{/* <UserCard/> */}</>}
                <RxDotFilled size={"20"} color="gold" />
                <Text fontWeight="600" color={mainText}>
                  {isCurrentRider ? "You" : text}
                </Text>
              </HStack>
              <VStack p={"3"}>
                <Button
                  background="#505050"
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
              <Text m={"1"}>Click to see this user on Google Map</Text>
            </>
          )}
          <Card border="1px solid #606060" className="w-full">
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
    </>
  );
}
