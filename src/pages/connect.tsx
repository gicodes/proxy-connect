import LocationCard from "@/components/templates/myExploreCard";
import LoadingConnect from "@/components/routes/connect/loading";
import GoToSignIn from "@/components/templates/onauthRedirect";
import { Rider } from "@/components/routes/connect/ryderType";
import { useApp } from "@/lib/utils/socketLocationProvider";
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
      <>
        <div>
          <Heading className="text-gray-600 justify-center px-4 py-8 lg:px-8">
            Explore
          </Heading>
          <hr />
          <Text
            className="justify-center px-4 py-8 lg:px-8"
            fontSize={"18"}
            fontWeight={"248"}
          >
            Send and receive location from ryders{" "}
          </Text>
          {isLoading ? <Spinner /> : null}
          {!data ? (<LoadingConnect/>
            
          ) : (
            data.map((rider: Rider, index: any) => (
              <LocationCard
                key={index}
                {...{
                  isCurrentRider: isCurrentRider,
                  coordinates: coordinates,
                  text: rider.firstName,
                }}
              />
            ))
          )}
        </div>
      </>
    );
  }

  return <GoToSignIn />;
}
