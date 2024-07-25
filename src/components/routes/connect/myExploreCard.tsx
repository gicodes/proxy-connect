import { Text, HStack, Stack } from "@chakra-ui/react";
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
import { FaMapMarkerAlt } from "react-icons/fa";
import seeLocation from "../../map/seeLocation";
import { IoMdCloseCircle } from "react-icons/io";
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

function toggleMap(open: boolean) {
  const mapElement = document.getElementById("main");
  const locationElement = document.getElementById("location-bar");

  if (mapElement && locationElement) {
    if (open) {
      mapElement.removeAttribute("hidden");
      locationElement.setAttribute("hidden", "true");
    } else {
      mapElement.setAttribute("hidden", "true");
      locationElement.removeAttribute("hidden");
    }
  } else {
    // Handle the case where elements might be null
    console.warn("Map or location element not found");
  }
}


function goToMaps() {
  toggleMap(true);
  return seeLocation();
}

export default function Location({
  isCurrentRider,
  coordinates,
  text,
}: LocationProps) {
  // state variables for to store
  // See Profile, See Map and Send Location instances;
  const [isHoveringSM, setIsHoveringSM] = useState(false);
  const [isHoveringSL, setIsHoveringSL] = useState(false);

  function handleMouseOverSM(){ setIsHoveringSM(true) }
  function handleMouseOutSM(){ setIsHoveringSM(false) }
  function handleMouseOverSL(){ setIsHoveringSL(true) }
  function handleMouseOutSL(){ setIsHoveringSL(false) }

  let location = "Abuja, Nigeria";
  let role = "Regular";

  return (
    <>
      <div className="explore-card-container sm-mx-auto">
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
                  <VStack p={2} display={"grid"}>
                    <Text className="text-indigo-300 fs-s">{role}</Text>
                    <Text className="text-green-300">{isCurrentRider ? "You" : text}</Text>
                    <Text className="text-gray-300 fs-s">{location}</Text>
                  </VStack>
                </HStack>
                <div>
                  <Button
                    background="#505050"
                    onMouseOut={handleMouseOutSM}
                    onMouseOver={handleMouseOverSM}
                    onClick={() => goToMaps()}
                  >
                    <FaMapMarkerAlt color="black" size="24" />
                  </Button>
                </div>
              </HStack>
            </Stack>
            {isHoveringSM && (
              <div className="p-1 mt-3 text-center">
                <Text color={"grey"}> 
                  Click to see this Service on Google Map
                </Text>
              </div>
            )}
            <Card id="location-bar" p={1} className={"mt-4 w-full bg-alt"}>
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
                >
                  <BsSendExclamationFill size={"25"} />
                </Button>
              </StatGroup>
            </Card>

            {isHoveringSL && (
              <div className="text-center p-1 mt-3">
                <Text color={"yellow"}>
                  Click to send your location to this user
                </Text>
              </div>
            )}
          </div>

          <main
            hidden
            id="main"
            className="container-fluid position-absolute h-100 bg-light"
          ><hr/>
            <div className="flex flex-end p-3" onClick={() => toggleMap(false)}>
              
              <IoMdCloseCircle color="yellow" size={22}/>
            </div>
            <div // this div could be controlled better in newer updates
              id="map"
              className="map mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"
            />
          </main>

        </Card>
      </div>
    </>
  );
}
