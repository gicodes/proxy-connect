import {
  Avatar,
  Button,
  Card,
  Stat,
  StatArrow,
  StatGroup,
  StatLabel,
  StatNumber,
  HStack,
  VStack,
  Text,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { ConnectProps } from "./connectProps";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { BsSendExclamationFill } from "react-icons/bs";
import { goToMaps, toggleMap } from "@/components/map/toggle-map";

export default function ConnectCard
  ({
    coords,
    online, // display different 4 user online
    username,
    userType, // decides other dynamic display
    socketId, // key for dynamic or mapped data
  }: ConnectProps
) {
  const [MapHoverAction, setMapHoverAction] = useState(false);
  const [shareHoverAction, setShareHoverAction] = useState(false);

  function handleMouseOverMap(){ setMapHoverAction(true) }
  function handleMouseOutMap(){ setMapHoverAction(false) }

  function handleMouseOverShare(){ setShareHoverAction(true) }
  function handleMouseOutShare(){ setShareHoverAction(false) }

  let location = "Lagos, Nigeria";

  return (
    <>
      <div 
        /* This div contains & controls certain breakpoint styling */
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
                  <VStack p={2} display={"grid"}>
                    <Text className={userType === "Demo" ? `text-yellow-300 fs-s` : 'text-indigo-200'}>{userType}</Text>
                    <Text className="text-green-300">{username}</Text>
                    <Text className="text-gray-300 fs-s">{location}</Text>
                  </VStack>
                </HStack>
                <div>
                  <Button
                    background="#505050"
                    onMouseOut={handleMouseOutMap}
                    onMouseOver={handleMouseOverMap}
                    onClick={() => goToMaps()}
                  >
                    <FaMapMarkerAlt color="black" size="24" />
                  </Button>
                </div>
              </HStack>
            </Stack>
            {MapHoverAction && (
              <div className="p-1 mt-3 text-center">
                <Text color={"burlywood"}> 
                  Toggle to see this Service on Google Map
                </Text>
              </div>
            )}
            <Card id="location-bar" p={1} className={"mt-4 w-full bg-alt"}>
              <StatGroup w="full" p="4" mb="2">
                <Stat>
                  <StatLabel>Latitude</StatLabel>
                  <HStack>
                    <StatNumber fontSize={"20"}>
                      {coords?.latitude}
                    </StatNumber>
                    <StatArrow type="increase" />
                  </HStack>
                </Stat>
                <Stat>
                  <StatLabel>Longitude</StatLabel>
                  <HStack>
                    <StatNumber fontSize={"20"}>
                      {coords?.longitude}
                    </StatNumber>
                    <StatArrow type="decrease" />
                  </HStack>
                </Stat>
                <Button
                  onMouseOut={handleMouseOutShare}
                  onMouseOver={handleMouseOverShare}
                >
                  <BsSendExclamationFill size={"25"} />
                </Button>
              </StatGroup>
            </Card>

            {shareHoverAction && (
              <div className="text-center p-1 mt-3">
                <Text color={"yellow"}>
                  Click to share your accurate location
                </Text>
              </div>
            )}
          </div>

          <main
            hidden
            id="main"
            className="container-fluid position-absolute h-100 bg-light"
          >
            <hr/>
            <div 
              className="flex flex-end p-3" 
              onClick={() => toggleMap(false)}
            > 
              <IoMdCloseCircle color="yellow" size={22}/>
            </div>
            <div // this div should be controlled better in newer updates
              id="map"
              className="map mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"
            />
          </main>

        </Card>
      </div>
    </>
  );
}
