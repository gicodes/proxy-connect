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

const Context = createContext<any>(null);

function SocketLocationProvider({ children }: { children: React.ReactNode }) {
  // var socket&Location with useRef
  const socketRef = useRef<any | null>();
  const watchLocation = useRef<any | null>();

  // state objects to store rider variables
  const [riders, setRiders] = useState<Rider[]>([]);
  const [currentRider, setcurrentRider] = useState<Rider>();
  const [hasAccessLocation, setHasAccessLocation] = useState(false);

  const toast = useToast();

  useEffect(() => {
    // Connect socket-client
    fetch("/api/server/socket");
    socketRef.current = io();

    // if socketRef, init Rider flow
    if (socketRef.current) {
      socketRef.current.on("new-rider", (data: Rider) => {
        setRiders((riders) => [...riders, data]);
      });
      socketRef.current.on("all-riders", (data: Rider[]) => {
        setRiders(data);
      });
      socketRef.current.on("current-rider", (data: Rider) => {
        setcurrentRider(data);
      });
      socketRef.current.on("position-change", (data: Rider) => {
        riders.map((rider) => {
          if (rider.socketId === data.socketId) return data;
          return rider;
        });
      });
    }

    // watch position changes
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
  }

  // callback function on success and join socket connection
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

  // callback function on error and handling error types
  function locationResolveError(error: GeolocationPositionError) {
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
    <Context.Provider
      // exposing provider
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
