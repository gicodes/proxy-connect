import { Flex, Image, Text, HStack, useColorModeValue } from "@chakra-ui/react";
import { RxDotFilled, RxStar } from "react-icons/rx";
import { Divider } from "@chakra-ui/react";

interface User {
  bio: string;
  age: number;
  name: string;
  email: string;
  avatar: string;
  contact: string;
  address: string;
  rating: number;
  revenue: number;
}

function MyProfileCard({
  age,
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
        <HStack pl={"1"} mt={"3"}>
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
            {age}
          </Text>
          <Text color={secondaryText} fontWeight="500">
            Age
          </Text>
        </Flex>
        <Flex flexDirection="column">
          <HStack>
            <Text
              fontWeight="600"
              color={mainText}
              fontSize="xl"
              textAlign="center"
            >
              {rating}
            </Text>
            <RxStar color="yellow" />
          </HStack>
          <Text color={secondaryText} fontWeight="500">
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
            <span className="text-green-500">$</span> {revenue}
          </Text>
          <Text color={secondaryText} fontWeight="500">
            Revenue
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default MyProfileCard;
