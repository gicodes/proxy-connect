import { ConnectProps, Coordinates } from "@/components/app-routes/connect/connectProps";
import ConnectCard from "@/components/app-routes/connect/connectCard";
import GoToSignIn from "@/components/templates/onauthRedirect";
import { businessRepo } from "../lib/api/mongodb/repo";
import Spinner from "@/components/templates/spinner";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Heading } from "@chakra-ui/react";

export default function Connect() {
  const [users, setUsers] = useState<any>();
  const [isLoading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState<Coordinates>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await fetch("/api/connect")
          .then((res) => res.json())
          .then((data) => {
            setUsers(data);
            setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchUsers();

    const persistCoords = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords;
          
          setCoordinates({
            latitude: latitude,
            longitude: longitude 
          })
        });
      }
      
      const currentUser = data?.user;
      // persist coordinates to server or cache data in client
      // await businessRepo?.update((currentUser?.email), {coordinates});
    }

    persistCoords();
  }, []);


  const { status, data } = useSession();

  if (status === "loading") return <Spinner />;
  if (status === "unauthenticated") return <GoToSignIn />;
  
  return (
    <div>
      <div>
        <Heading className="text-gray-600 justify-center px-4 py-8 lg:px-8">
          Connect with Proxy
        </Heading>
      </div>

      {isLoading && <Spinner />}

      <div className="explore-container">
        {users?.map(
          (user: ConnectProps, index: any) => (
            <ConnectCard
              key={index} 
              {...{
                coords: user?.coords,
                online: true,
                username: user?.username,
                userType: "Demo",
                socketId: null
              }}              
            />
          )
        )}
      </div>
    </div>
  )
}