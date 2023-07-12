import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import io from "socket.io-client";

interface Location {
  coords: { latitude: number; longitude: number } | null;
  socketId: any;
  id: string;
  timestamp: number;
  userId: string;
  userName: string;
  userDOB: string;
  vitals: {
    bloodPressureSystole: number;
    bloodPressureDiastole: number;
  };
}

interface ContextProps {
  initUserLocation: () => void;
  users: Location[];
  currentUser: Location | undefined;
}

const Context = createContext<ContextProps>({
  initUserLocation: () => {},
  users: [],
  currentUser: undefined,
});

function LocationProvider({ children }: { children: React.ReactNode }) {
  // Specify your socket endpoint
  const endpoint = "/api/socket/socket";

  const socketRef = useRef<any>();
  const watchLocation = useRef<number | undefined>();

  const [users, setUsers] = useState<Location[]>([]);
  const [hasAccessLocation, setHasAccessLocation] = useState(false);
  const [currentUser, setCurrentUser] = useState<Location | undefined>();

  const router = useRouter();
  const toast = useToast();

  // Connect client-socket to server
  const connectSocket = () => {
    socketRef.current = io(endpoint);
    console.log("Connected to socket server");
  };

  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      console.log("Diconnected from socket server");
    }
  };

  useEffect(() => {
    connectSocket();

    if (socketRef.current) {
      socketRef.current.on("new-rider_check-in", (data: Location) => {
        setUsers((prevUsers) => [...prevUsers, data]);
      });

      socketRef.current.on("all-riders", (data: Location[]) => {
        setUsers(data);
      });

      socketRef.current.on("current-rider", (data: Location) => {
        setCurrentUser(data);
      });

      socketRef.current.on("position-change", (data: Location) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === data.id ? data : user))
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
      if (watchLocation.current) {
        navigator.geolocation.clearWatch(watchLocation.current);
      }
      disconnectSocket();
    };
  }, []);

  function initUserLocation() {
    if (!navigator.geolocation) {
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

  function positionChange(data: GeolocationPosition) {
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

  function locationResolveSuccessfully(data: GeolocationPosition) {
    setHasAccessLocation(true);
    const { latitude, longitude } = data.coords;
    if (socketRef.current) {
      socketRef.current.emit("join", {
        latitude,
        longitude,
      });
    }
    toast({
      title: "Location",
      description: "Location fetched successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    router.push("/location");
  }

  function locationResolveError(error: GeolocationPositionError) {
    let errorType = "";
    if (error.code === 1) {
      errorType = "Permission Denied";
    } else if (error.code === 2) {
      errorType = "Position Unavailable";
    } else if (error.code === 3) {
      errorType = "Timeout";
    }

    toast({
      title: errorType,
      description: error.message,
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }

  return (
    <Context.Provider
      value={{
        initUserLocation,
        users,
        currentUser,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default LocationProvider;

export const useApp = () => useContext(Context);
