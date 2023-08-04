import { createContext, useContext, useRef } from "react";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/toast";
import io from "socket.io-client";

// Defining Rider
interface Rider {
  id: any;
  socketId: any;
  currentRider: any;
  coords: { latitude: number; longitude: number } | null;
}

// Create Context to wrap Rider values
const Context = createContext<any>(null);

function SocketLocationProvider({ children }: { children: React.ReactNode }) {
  // var socket with useRef
  const socketRef = useRef<any | null>();
  // var location with useRef
  const watchLocation = useRef<any | null>();

  // state object to store riders array []
  const [riders, setRiders] = useState<Rider[]>([]);
  // state object to store the currentRider
  const [currentRider, setcurrentRider] = useState<Rider>();
  // state object to store hasAccessLocation
  const [hasAccessLocation, setHasAccessLocation] = useState(false);

  const toast = useToast();

  useEffect(() => {
    // Connect socket-client
    socketRef.current = io();
    console.log("Client CL: Connected to socket client");

    // if socketRef, init Rider flow
    if (socketRef.current) {
      // in Rider, init new rider
      socketRef.current.on("new-rider", (data: Rider) => {
        setRiders((riders) => [...riders, data]);
        console.log("Client CL: new rider initialized");
      });
      // in Rider[], init all riders
      socketRef.current.on("all-riders", (data: Rider[]) => {
        setRiders(data);
        console.log("Client CL: all riders initialized");
      });
      // in Rider, init current rider
      socketRef.current.on("current-rider", (data: Rider) => {
        setcurrentRider(data);
        console.log("Client CL: current rider initialized");
      });
      // in Rider, init position change
      socketRef.current.on("position-change", (data: Rider) => {
        riders.map((rider) => {
          // check if socketId === data socketId
          if (rider.socketId === data.socketId) return data;
          return rider;
        });
        console.log("Client CL: Position change recorded");
      });
    }

    // watch position changes if hasAccessLocation
    if (hasAccessLocation) {
      watchLocation.current = navigator.geolocation.watchPosition(
        positionChange,
        locationResolveError
      );
    }

    return () => {
      // return geoLocation.clearWatch before socket disconnect
      navigator.geolocation.clearWatch(watchLocation.current as any);
      socketRef.current.disconnect();
      console.log("Client CL: Diconnected from socket client");
    };
  }, []);

  // Initialize Rider Location
  function initRiderLocation() {
    if (!navigator.geolocation) {
      // using toast, throw error
      toast({
        title: "Geolocation Unsupported",
        description: "Your system does not support Geolocation",
        status: "error",
        duration: 4000,
        isClosable: true,
      });

      return;
    }
    navigator.geolocation.getCurrentPosition(
      locationResolveSuccessfully,
      locationResolveError
    );
    console.log("Client CL: rider location initialized");
  }

  function locationResolveSuccessfully(data: GeolocationPosition) {
    setHasAccessLocation(true);
    const latitude = data.coords.latitude;
    const longitude = data.coords.longitude;
    if (socketRef.current) {
      socketRef.current.emit("join", {
        latitude,
        longitude,
      });
    }

    // using toast, show success message
    toast({
      title: "Location",
      description: "Location fetched successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  }

  function locationResolveError(error: GeolocationPositionError) {
    // error type declaration
    let errorType = "";
    if (error.code === 1) {
      errorType = "Permission Denied";
    } else if (error.code === 2) {
      errorType = "Position Unavailable";
    } else if (error.code === 3) {
      errorType = "Timeout";
    }
    // use toast to show error message
    toast({
      title: errorType,
      description: error.message,
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }

  function positionChange(data: GeolocationPosition) {
    // get rider coordinates from GeolocationPosition
    const { latitude, longitude } = data.coords;
    if (socketRef.current) {
      // emit position change to socket client API
      socketRef.current.emit("position-change", {
        id: currentRider?.id,
        coords: {
          latitude,
          longitude,
        },
      });
    }
  }

  return (
    // expose context provider
    <Context.Provider
      value={{
        initRiderLocation,
        currentRider,
        riders,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useApp = () => useContext(Context);

export default SocketLocationProvider;
