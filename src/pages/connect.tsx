import LocationCard from "@/components/routes/connect/myExploreCard";
import { useApp } from "@/components/socket/socketLocationProvider";
import { Rider } from "@/components/routes/connect/serviceType";
import GoToSignIn from "@/components/templates/onauthRedirect";
import Spinner from "@/components/templates/spinner";
import { useState, useRef, useEffect } from "react";
import { Heading, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export default function Explore() {
  // states to store ref objects
  const nearbyRef = useRef<any>();
  const { isCurrentRider } = useApp();
  const [data, setData] = useState<any>();
  const [isLoading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState({});

  // var regionFiltered: pending functionality && nearbyRiders
  const regionFiltered = () => nearbyRef.current.updateRiders(data.region);

  useEffect(() => {
    fetch("/api/connect")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setCoordinates({
          latitude: latitude.toFixed(4),
          longitude: longitude.toFixed(4),
        });
      });
    }
  }, []);

  const { status, update } = useSession();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "authenticated") {
    return (
      <div>
        <div>
          <Heading className="text-gray-600 justify-center px-4 py-8 lg:px-8">
            Explore
          </Heading>
          <hr />
        </div>
        <div>
          <Text
            className="justify-center px-4 py-8 lg:px-8 text-yellow-200"
            fontSize={"18"} 
          >
            Send and get location from ryders online
          </Text>
        </div>

        {isLoading && <Spinner />}

        <div className="explore-container">
          {data?.map((rider: Rider, index: any) => (
              <LocationCard
                key={index}
                {...{
                  isCurrentRider: isCurrentRider,
                  coordinates: coordinates,
                  text: rider.firstName,
                }}
              />
            )
          )}
        </div>
      </div>
    )
  }

  return <GoToSignIn />;
}