import { ConnectProps, Coordinates } from "@/components/app-routes/connect/connectProps";
import ConnectCard from "@/components/app-routes/connect/connectCard";
import GoToSignIn from "@/components/templates/onauthRedirect";
import { calculateDistance } from "@/lib/utils/get-distance";
import { useState, useEffect, useCallback } from "react";
import { businessRepo } from "../lib/api/mongodb/repo";
import Spinner from "@/components/templates/spinner";
import { useSession } from "next-auth/react";
import { Heading } from "@chakra-ui/react";
import { debounce } from "lodash";

interface ConnectCardProps extends ConnectProps{
  location: [ number, number ] | any | undefined;
};

export default function Connect() {
  const { status, data } = useSession();
  const [users, setUsers] = useState<any>();
  const [isLoading, setLoading] = useState(true);
  const [myCoordinates, setMyCoordinates] = useState<Coordinates>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
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

  const updateCoordinates = useCallback(
    debounce(async (myCoordinates: Coordinates) => {
      if (data?.user.email && myCoordinates) {
        try {
          const location = {
            type: "Point",
            coordinates: myCoordinates,
          };
          await businessRepo.update(data?.user?.email, { location });
        } catch (error) {
          console.error("Error updating coordinates:", error);
        }
      }
    }, 600000), // debounce to update every 600 seconds or as needed
    [data]
  );

  useEffect(() => {
    fetchUsers();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setMyCoordinates([longitude, latitude]);
        updateCoordinates(myCoordinates);
      });
    }
  }, []);

  if (status === "loading" || isLoading) return <Spinner />;
  if (status === "unauthenticated") return <GoToSignIn />;

  return (
    <div>
      <Heading className="text-gray-600 justify-center px-4 py-8 lg:px-8">
        Connect with Proxy
      </Heading>

      <div className="explore-container">
        {users?.map(
          (user: ConnectCardProps, index: any) => {
            const userCoordinates = user?.location?.coordinates;
            const distance = myCoordinates && userCoordinates ? calculateDistance(myCoordinates, userCoordinates) : null;
            const distanceInKm = distance?.toFixed(1)

            return (
              <ConnectCard
                key={index}
                {...{
                  address: user?.address,
                  bio: user?.bio,
                  distance: distanceInKm,
                  online: user?.online || false,
                  username: user?.username,
                  userType: user?.userType || "Demo",
                  rating: user?.rating || 1,
                  revenue: user?.revenue || 1,
                  service: user?.service
                }}              
              />
            )}
          )}
      </div>
    </div>
  )
}