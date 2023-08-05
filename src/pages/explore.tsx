import { Button, Heading, Text } from "@chakra-ui/react";
import ChoosePersona from "@/components/choosePersona";
import NearbyRiders from "@/components/nearbyRiders";
import { useState, useRef, useEffect } from "react";
import { initMap } from "@/components/googleMap";

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
  const [id, setId] = useState<any>();
  const [data, setData] = useState<any>();
  const [isLoading, setLoading] = useState(true);

  // create variables from loaded riders object
  const ridersOffline = data?.filter((rider: Rider) => !rider.online);
  const rider = data?.find((rider: Rider) => rider.id === id) || {};
  const regionFiltered = () => nearbyRef.current.updateRiders(data.region);
  const personaSelected = (selectedId: any) => {
    setId(selectedId);
  };

  useEffect(() => {
    // useEffect instance to load Rider data
    fetch("/api/explore")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  useEffect(() => {
    // useEffect instance to load the Maps API by adding inline bootstrap
    if (!(typeof google === "object" && typeof google.maps === "object")) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?
        key=${API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        // var center as lat and lng coordinates
        const center = {
          lat: latitude,
          lng: longitude,
        };
        try {
          window.initMap = function () {
            initMap(center);
          };
        } catch (err: any) {
          console.error(`error: ${err.message}`);
          return;
        }
      });
    }
  }, []);

  return (
    <>
      <Heading size="lg" my="1">
        EXPLORE ACTIVE RIDERS
      </Heading>
      {isLoading ? <Text>Loading...</Text> : null}
      {!data ? (
        <Text> Searching for riders...</Text>
      ) : (
        data.map((rider: Rider, index: any) => (
          <Button display={"block"} bg="grey" key={rider.id} mt="3">
            {rider.username}
          </Button>
        ))
      )}

      <main className="container-fluid position-absolute h-100 bg-light">
        <Text pb="4" pt="4">
          See yourself and other riders on google map{" "}
        </Text>
        <div
          // hidden
          id="map"
          className="map mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"
        ></div>
        {id ? (
          <div className="row position-absolute w-100 h-100">
            <section className="col-md-3 position-relative d-flex flex-wrap h-100 align-items-start align-content-between bg-white px-0">
              <NearbyRiders rider={rider} refProp={() => nearbyRef} />
            </section>
          </div>
        ) : (
          <ChoosePersona
            count={5}
            riders={ridersOffline}
            onSelected={personaSelected}
          />
        )}
      </main>
    </>
  );
}
