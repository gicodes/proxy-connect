import { VStack, Card, HStack, Text } from "@chakra-ui/react";
import { MdVerifiedUser } from "react-icons/md";
import { RxDotFilled } from "react-icons/rx";

interface User {
  bio: string;
  name: string;
  email: string;
  avatar: string;
  contact: string;
  location: string;
}

const ProfileComponent = ({
  name,
  avatar,
  location,
  bio,
  contact,
  email,
}: User) => {
  return (
    <>
      <div className="w-full">
        <Text className="m-2 text-center text-lg font-normal leading-9">
          Hello... <span className="profile-name">{name}</span>
        </Text>
        <hr />
        <Card bg="transparent" className="mt-2 w-full">
          <HStack className="profile-c1">
            <VStack>
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
              <HStack className="flex-1 flex-col m-2 justify-center">
                <RxDotFilled size={"20"} color="green" />
                <Text className="profile-location">{location}</Text>
              </HStack>
            </VStack>
            <VStack className="profile-c2">
              <Text className="mb-2">{name}</Text>
              <Text className="profile-email">{email}</Text>
              <Text className="profile-numbers">{contact}</Text>
            </VStack>
          </HStack>
          <br />
          <Text bg={"#606060"} className="text-center leading-9 profile-text">
            {bio}
          </Text>
        </Card>
      </div>
    </>
  );
};

export default ProfileComponent;
