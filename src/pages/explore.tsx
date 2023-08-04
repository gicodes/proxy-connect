import ChoosePersona from "@/components/choosePersona";
import NearbyRiders from "@/components/nearbyRiders";
import { useState, useRef, useEffect } from "react";
import { Heading, Text } from "@chakra-ui/react";
import { initMap } from "@/components/googleMap";

// Defining Rider
interface Rider {
  id: string;
  online: boolean;
  firstName: string;
  position: { lat: number; lng: number };
}

export default function Explore() {
  // states to store ref objects
  const nearbyRef = useRef<any>();
  const [id, setId] = useState<any>();
  const [data, setData] = useState<any>();
  const [isLoading, setLoading] = useState(true);

  // create variables from loaded riders object
  // const ridersOffline = data.filter((rider: Rider) => !rider.online);
  // const rider = data.find((rider: Rider) => rider.id === id) || {};
  const regionFiltered = () => nearbyRef.current.updateRiders(data.region);
  const personaSelected = (selectedId: any) => {
    setId(selectedId);
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/explore")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  // var api key with process NEXT PUBLIC
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  // map and map variables are rendered in this constructor
  useEffect(() => {
    if (!(typeof google === "object" && typeof google.maps === "object")) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?
        key=${API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords;

          // var center as geo coordinates
          const center = {
            lat: latitude,
            lng: longitude,
          };

          // use window to initialize map
          window.initMap = function () {
            initMap(center);
          };
        });
      }
    }
  }, []);

  return (
    <>
      <Heading size="lg" my="1">
        EXPLORE ACTIVE RIDERS
      </Heading>
      {isLoading ? <Text>Loading...</Text> : null}
      {!data ? (
        <Text>Checking for rider... 0 found</Text>
      ) : (
        data.map((rider: Rider) => (
          <Text key={rider.id} mb="2">
            Name: {rider.firstName}
          </Text>
        ))
      )}
      <div
        id="map"
        className="map mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"
      ></div>

      <main className="container-fluid position-absolute h-100 bg-light"></main>
    </>
  );
}
