import { Flex, Image, Text, HStack, useColorModeValue } from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";
import { RxDotFilled, RxStarFilled } from "react-icons/rx";
import { Divider } from "@chakra-ui/react";

interface User {
  bio: string;
  name: string;
  email: string;
  avatar: string;
  rating: number;
  orders: number;
  revenue: number;
  contact: string;
  address: string;
}

export default function MyProfileCard({
  orders,
  address,
  avatar,
  bio,
  contact,
  email,
  name,
  rating,
  revenue,
}: User) {
  let boxBg = useColorModeValue("white !important", "#111c44 !important");
  let mainText = useColorModeValue("gray.800", "white");
  let secondaryText = useColorModeValue("gray.400", "gray.400");

  function ratingScore() {
    const components = [];

    for (let i = 0; i < rating; i++) {
      components.push(<RxStarFilled key={i} size={"20"} color="gold" />);
    }

    return <>{components}</>;
  }

  return (
    <Flex
      borderRadius={"20px"}
      bg={boxBg}
      p={"20px"}
      // line break: pending breakpoints. see @/src/components/templates/theme
      // h={"345px"}
      // w={{ base: "315px", md: "345px" }}
      alignItems={"center"}
      direction={"column"}
    >
      <Image
        src={"https://i.ibb.co/xmP2pS6/Profile.png"}
        maxW="100%"
        borderRadius="20px"
      />
      <Flex flexDirection="column" mb="30px">
        <Image
          src={avatar}
          border="5px solid red"
          mx="auto"
          borderColor={boxBg}
          width="68px"
          height="68px"
          mt="-38px"
          borderRadius="50%"
        />
        <Text
          fontWeight="600"
          color={mainText}
          textAlign="center"
          fontSize="xl"
        >
          {name}
        </Text>{" "}
        <Text
          color={secondaryText}
          textAlign="center"
          fontSize="sm"
          fontWeight="500"
        >
          {email}
        </Text>
        <Text textAlign="center" className="mt-5 profile-numbers">
          {contact}
        </Text>
        <HStack mt={"3"}>
          <RxDotFilled size={"20"} color="green" />
          <Text className="profile-location">{address}</Text>
        </HStack>
      </Flex>
      <Divider mb={"5"} w={"100%"} />
      <Text className="text-center leading-9 profile-text">{bio}</Text>
      <br />
      <Divider mb={"5"} w={"100%"} />
      <Flex justify="space-between" w="100%" px="36px">
        <Flex flexDirection="column">
          <Text
            fontWeight="600"
            color={mainText}
            fontSize="xl"
            textAlign="center"
          >
            {orders}
          </Text>
          <Text color={secondaryText} fontWeight="500">
            Rides
          </Text>
        </Flex>
        <Flex flexDirection="column">
          <Flex pt={"1"} pb={1.5} justifyContent={"center"} flexDirection="row">
            {ratingScore()}
          </Flex>
          <Text textAlign={"center"} color={secondaryText} fontWeight="500">
            Rating
          </Text>
        </Flex>
        <Flex flexDirection="column">
          <Text
            fontWeight="600"
            fontSize="xl"
            color={mainText}
            textAlign="center"
          >
            <span hidden className="text-green-500">
              $
            </span>{" "}
            {revenue}
          </Text>
          <Text color={secondaryText} fontWeight="500">
            Revenue
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
