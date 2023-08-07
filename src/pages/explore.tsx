import { useApp } from "@/lib/utils/socketLocationProvider";
import Location from "@/components/exploreRiderCard";
import { useState, useRef, useEffect } from "react";
import { Button, Text } from "@chakra-ui/react";

// Defining Rider
interface Rider {
  id: string;
  online: boolean;
  username: string;
  firstName: string;
  position: { lat: number; lng: number };
}

export default function Explore() {
  // states to store ref objects
  const nearbyRef = useRef<any>();
  const { isCurrentRider } = useApp();
  const [data, setData] = useState<any>();
  const [isLoading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState({});

  // var ridersOffline: pending functionality && ridersOnline
  // const ridersOffline = data.filter((rider: Rider) => !rider.online);
  // var regionFiltered: pending functionality && nearbyRiders
  const regionFiltered = () => nearbyRef.current.updateRiders(data.region);

  useEffect(() => {
    // useEffect instance to load Rider data
    fetch("/api/explore")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });

    if (navigator.geolocation) {
      // get lat & long coordinates from `navigator.geolocation`
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setCoordinates({
          latitude: latitude.toFixed(4),
          longitude: longitude.toFixed(4),
        });
      });
    }
  }, []);

  return (
    <>
      <div className="flex flex-1 justify-center px-4 py-8 lg:px-8">
        Explore
      </div>
      {isLoading ? <Text m="1">Loading...</Text> : null}
      {!data ? (
        <Text m="1"> Searching for riders...</Text>
      ) : (
        data.map((rider: Rider, index: any) => (
          <Location
            key={index}
            {...{
              isCurrentRider: isCurrentRider,
              coordinates: coordinates,
              text: rider.firstName,
            }}
          />
        ))
      )}
    </>
  );
}
