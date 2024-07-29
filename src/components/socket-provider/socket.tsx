import { UserProps } from "../app-routes/profile/userProps";
import { createContext, useContext, useRef } from "react";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/toast";
import io from "socket.io-client";

const Context = createContext<any>(null);

function SocketProvider(
  { children }: { children: React.ReactNode }
) {
  const socketRef = useRef<any | null>();
  const watchLocation = useRef<any | null>();

  const [users, setUsers] = useState<UserProps[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProps>();
  const [hasAccessLocation, setHasAccessLocation] = useState(false);

  const toast = useToast();

  useEffect(() => {
    fetch("/api/socket-provider/socket");
    socketRef.current = io();
  
    if (socketRef.current) {
      socketRef.current.on("all-users", (data: UserProps[]) => {
        setUsers(data);
      });

      socketRef.current.on("current-user", (data: UserProps) => {
        setCurrentUser(data);
      });

      socketRef.current.on("new-user", (data: UserProps) => {
        setUsers((users) => [...users, data]);
      });
      
      if (currentUser?.userType === "Business") {
          socketRef.current.on("join-business", (data: UserProps) => {
          // handle join-business event
          // example: Add business users to a separate state or handle as needed
        });
      } else {
        socketRef.current.on("join-demo", (data: UserProps) => {
        // handle join-demo event
        });
      }
      
      socketRef.current.on("position-change", (data: UserProps) => {
        setUsers((users) =>
          users.map((user) => (user.socketId === data.socketId ? data : user))
        );
      });
    }
  
    if (hasAccessLocation) {
      watchLocation.current = navigator.geolocation.watchPosition(
        positionChange,
        locationResolveError
      );
    }
  
    return () => {
      navigator.geolocation.clearWatch(watchLocation.current as any);
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [hasAccessLocation]);  

  // Initialize User Location
  function initUserLocation() {
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

  // Function for join-events with userType handling
  function locationResolveSuccessfully(data: GeolocationPosition) {
    setHasAccessLocation(true);
    const latitude = data.coords.latitude;
    const longitude = data.coords.longitude;
  
    if (socketRef.current && currentUser) {
      if (currentUser.userType === "Business") {
        socketRef.current.emit("join-business", {
          ...currentUser,
          latitude,
          longitude,
        });
      } else {
        socketRef.current.emit("join-individuals", {
          ...currentUser,
          latitude,
          longitude,
        });
      }
    }
  
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
    // get user coordinates from GeolocationPosition
    const { latitude, longitude } = data.coords;
    if (socketRef.current) {
      socketRef.current.emit("position-change", {
        id: currentUser?.id,
        coords: {
          latitude,
          longitude,
        },
      });
    }
  }

  return (
    <Context.Provider
      value={{
        initUserLocation,
        currentUser,
        users,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useApp = () => useContext(Context);

export default SocketProvider;
