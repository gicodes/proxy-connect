import {  Card, Image, Text, HStack, Stack, VStack } from "@chakra-ui/react";
import { FaEdit, FaEnvelope } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { RxStarFilled } from "react-icons/rx";
import { User } from "./userType";
import { useState } from "react";
import ProfileEdit from "./profille-edit";

export default function ProfileCard({
  address,
  avatar,
  bio,
  email,
  name,
  orders, // orders is an empty list
  phone,
  rating,
  revenue,
  role,
}: User
) {
  const [ edit, setEdit ] = useState(false);
  const [ class2, setClass2] = useState("");
  const [ class3, setClass3 ] = useState("hidden");

  let company = "Ryder-GP";
  let sales = 0;

  const ratingScore = () => {
    const components = [];

    for (let i = 0; i < rating; i++) {
      components.push(<RxStarFilled key={i} size={"20"} color="gold" />);
    }

    return <>{components}</>;
  }

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
            <Text>Your profile is Private. Only you can see all the information displayed here!</Text>
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
            <AiFillCloseCircle size={20} onClick={cancelEdit}/>
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
                  <div>
                    <Text className="h5b text-primary">{name}</Text>
                    <Text className="text-flex-sm mt-4">{role} at {company}</Text>
                    <Text className="text-light mt-4">{address}</Text>
                  </div>
                  <div>
                    <Text className="py-3 fs-s">{email}</Text>
                    <Text className="py-3 fs-s text-light">{phone}</Text>
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
                  <hr/>
                </Stack>

                <Stack>
                  <HStack 
                    justify="space-between" 
                    w="100%" 
                    px="50px" 
                    py="30px"
                  >
                    <VStack>
                      <Text>{sales}</Text>
                      <Text>Sales</Text>
                    </VStack>
                    <VStack>
                      <Text>{ratingScore()}</Text>
                      <Text> Rating </Text>
                    </VStack>
                    <VStack>
                      <Text>
                        <span hidden className="text-green-500">$</span>
                        {revenue}
                      </Text>
                      <Text>Revenue</Text>
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
