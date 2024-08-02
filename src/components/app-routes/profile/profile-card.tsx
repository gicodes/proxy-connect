import {  Card, Image, Text, HStack, Stack, VStack, StatArrow, Stat } from "@chakra-ui/react";
import { AiFillCloseCircle, AiOutlineStock } from "react-icons/ai";
import UserRating from "@/components/templates/ratingGen";
import { FcSalesPerformance } from "react-icons/fc";
import { MdOutlineStarRate } from "react-icons/md";
import ProfileEdit from "./profille-edit";
import { UserProps } from "./userProps";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";

export default function ProfileCard({
  address,
  avatar,
  bio,
  company,
  email,
  name,
  orders, // orders is an empty list
  phone,
  rating,
  revenue,
  userType,
}: UserProps
) {
  const [ edit, setEdit ] = useState(false);
  const [ class2, setClass2] = useState("");
  const [ class3, setClass3 ] = useState("hidden");

  let sales = 0;

  const demoType = userType === "Demo";
  const negativeRev = !revenue || revenue < 5;

  function toggleEdit() {
    setEdit(true);
    setClass3("");
    setClass2("hidden");
  }
  function cancelEdit() {
    setEdit(!edit);
    setClass3("hidden");  
    setClass2("")
  }

  return (
    <>
      <div className="profile-container"> 
        <div className="profile-header">
          <div className="header-alert">
            <Text> Your profile is Private. Only you can see all the information displayed here!</Text>
          </div>
          <div className="img-container">
            <Image 
              alt="profile header" 
              className="header-img"
              src="https://images.unsplash.com/photo-1718062457089-b8ba9ee33da7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        </div>
        <div className={`pb-6 flex flex-col ${class3}`}>
          <button className="flex-end">
            <AiFillCloseCircle size={20} onClick={cancelEdit} />
          </button>
          {edit && <ProfileEdit />}
        </div>

        <div className={`cards-container ${class2}`}>
          <Card className="w-full">
            <div className="card-header">
              <div className="pr-info-group">
                <div id="pr-avatar">
                  <Image 
                    src={avatar} 
                    className="avatar-img" 
                    alt="profile avatar"
                  />
                </div>
                <div className="pr-info">
                  <div className="p-2">
                    <Text className="h5b">{name}</Text>
                    <Text 
                      color={demoType ? "gray.400" : "indigo.500"}
                      className="text-flex-sm"
                    >
                      {userType} at {company}</Text>
                    <Text color={"khaki"} className="text-light mt-4">{address}</Text>
                  </div>
                  <div>
                    <Text className="py-3 fs-s">{email}</Text>
                    <Text className="py-3 fs-s text-light">
                      {phone ? phone : "No phone registered"}
                    </Text>
                  </div>
                </div>
              </div>
              <div onClick={toggleEdit} className="ml-6 flex-end">
                <FaEdit size={25}/>
              </div>   
            </div>

            <div className="card-body">
              <div>
                <Stack mx={"auto"}>
                  <div className="pr-bio"> 
                    <Text>{bio}</Text>
                  </div>
                </Stack>

                <Stack>
                  <HStack 
                    justify="space-between" 
                    w="100%" 
                    px="50px" 
                    py="30px"
                  >
                    <VStack>
                      <HStack>
                        <Text>{sales}</Text>
                        <Stat><StatArrow type={negativeRev ? "decrease" : "increase"} /> </Stat>
                      </HStack>
                      <HStack>
                        <FcSalesPerformance />
                        <Text>Sales</Text>
                      </HStack>                  
                    </VStack>
                    <VStack>
                      <UserRating rating={rating} />
                      <Text>Rating</Text>
                    </VStack>
                    <VStack>
                      <HStack>
                        <Text>{revenue}%</Text>
                        <Stat><StatArrow type={negativeRev ? "decrease" : "increase"} /> </Stat>
                      </HStack>
                      <HStack>
                        <AiOutlineStock color="skyblue" />
                        <Text>Revenue</Text>
                      </HStack>
                    </VStack>
                  </HStack>
                </Stack>
              </div>    
            </div>          
          </Card>
        </div>
      </div>
    </>
  );
}
