import {
  Avatar,
  Button,
  Card,
  Stat,
  StatArrow,
  StatNumber,
  HStack,
  VStack,
  Text,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { SiWebmoney } from "react-icons/si";
import { ConnectProps } from "./connectProps";
import { IoMdCloseCircle } from "react-icons/io";
import { BsSendExclamationFill } from "react-icons/bs";
import UserRating from "@/components/templates/ratingGen";
import { goToMaps, toggleMap } from "@/components/map/toggle-map";
import { FaMapMarkerAlt, FaUserAlt, FaMapPin } from "react-icons/fa";

export default function ConnectCard
  ({
    address,
    bio,
    distance,
    online, // display differs if user online
    username,
    userType, // decides other dynamic display
    rating,
    revenue,
    service
  }: ConnectProps
) {
  const [MapHoverAction, setMapHoverAction] = useState(false);
  const [shareHoverAction, setShareHoverAction] = useState(false);

  function handleMouseOverMap(){ setMapHoverAction(true) }
  function handleMouseOutMap(){ setMapHoverAction(false) }

  function handleMouseOverShare(){ setShareHoverAction(true) }
  function handleMouseOutShare(){ setShareHoverAction(false) }

  let company = "Ryder-GP";
  
  const demoType = userType === "Demo";
  const adminType = userType === "Admin";
  const negativeRev = !revenue || revenue < 5;

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
                  {/* Profile photo area */}
                  <Avatar 
                    borderColor={"greenyellow"}
                    borderWidth={"1px"}
                    size={"xl"}
                  />
                  <VStack p={2} display={"grid"}>
                    <a href="#" className="hover-link"><Text color={"green.200"}>{username}</Text></a>
                    <Text fontWeight={100}>{service}</Text>
                    <Text className="connect-bio">{bio}</Text>
                  </VStack>
                </HStack>
                <div>
                  <Button
                    hidden // hidden until newer update with modified map render
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
              <div className="connect-stat-grp">
                <Stat>
                  {/* left-side set of stats */}
                  <HStack fontSize={15}>
                    <FaUserAlt color={demoType ? 'gray' : 'skyblue'} />
                    <Text color={demoType ? 'gray.500' : 'indigo.500'} ml={2}>
                      {userType}
                    </Text>
                    <Text color={"gray.400"} ml={-1}>
                      {adminType ? "at": "for"} {company}
                    </Text>
                  </HStack>
                  <br/> 
                  <HStack>
                    <SiWebmoney fontSize={18} color="skyblue" />                   
                    <StatNumber fontSize={"18"}>
                      {revenue}%
                    </StatNumber>
                    <StatArrow type={negativeRev ? "decrease" : "increase"} />      
                    <br/>
                    <UserRating rating={rating}/>
                  </HStack>
                </Stat>
                
                <Stat className="sm-my">
                  {/* right-side set of stats */}
                  <HStack mb={2}>
                    <FaMapPin color="skyblue" />
                    <Text fontWeight={550} color={"khaki"}>{address}</Text>
                    <GoDotFill color={online ? "lightgreen": "gray"} />
                  </HStack>
                  <HStack className="sm-fs">
                    <StatNumber fontSize={"15"} className="sm-fs">
                      {distance}
                    </StatNumber>
                    {distance && <Text ml={-1} color={"gray.300"}>km away</Text>}
                  </HStack>
                </Stat>
                <Button 
                  className="sm-my sm-fe"
                  onMouseOut={handleMouseOutShare}
                  onMouseOver={handleMouseOverShare}
                >
                  <BsSendExclamationFill size={"25"} />
                </Button>
              </div>
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
