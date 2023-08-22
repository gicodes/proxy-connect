import { VStack, Card, HStack, Text, Heading } from "@chakra-ui/react";
import { MdVerifiedUser } from "react-icons/md";
import { RxDotFilled } from "react-icons/rx";

interface User {
  bio: string;
  name: string;
  email: string;
  avatar: string;
  contact: string;
  address: string;
}

const ProfileComponent = ({
  address,
  avatar,
  bio,
  contact,
  email,
  name,
}: User) => {
  return (
    <>
      <div className="w-full">
        <Heading className="flex flex-1 text-gray-600 justify-center py-4 lg:px-8 mt-5">
          Profile
        </Heading>
        <hr />
        <Card bg="transparent" className="w-full">
          <HStack className="profile-c1">
            <VStack alignItems={"flex-start"}>
              <a href="#">
                <img
                  className="mt-5 mx-auto h-20 w-auto profile-image"
                  src={avatar}
                  alt="profile image"
                />
              </a>
              <div className="profile-verified">
                <MdVerifiedUser color="yellowgreen" size={"20"} />
              </div>
              <HStack alignItems={"flex-start"} mt={"3"}>
                <RxDotFilled size={"20"} color="green" />
                <Text className="profile-location">{address}</Text>
              </HStack>
            </VStack>
            <VStack mb={"5"} alignItems={"flex-end"}>
              <Text className="profile-name">{name}</Text>
              <Text className="profile-email">{email}</Text>
              <Text className="profile-numbers">{contact}</Text>
            </VStack>
          </HStack>
          <br />
          <Card>
            <Text className="text-center leading-9 profile-text">{bio}</Text>
          </Card>
        </Card>
      </div>
    </>
  );
};

export default ProfileComponent;
