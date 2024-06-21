import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Badge,
  Box,
  Button,
  CloseButton,
  HStack,
  Text,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { TfiHandPointRight } from "react-icons/tfi";
import { useApp } from "@/lib/utils/socketLocationProvider";

export async function sendApiRequest() {
  // function sendApiRequest is passed as prop to Switch

  const session = await getSession();
  if (!session) return;

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        const { latitude, longitude } = coords;
        try {
          // bound for resolution or modification via ridersRepo
          await fetch(`/api/riders/[${session?.user.name}]`, {
            method: "PUT",
            body: JSON.stringify({ latitude, longitude }),
          });
        } catch (err: any) {
          return null;
        }
      });
    }
  }

  return getLocation();
}

function switchAlert() {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true });

  return isVisible ? (
    <Alert mb="5" status="warning">
      <Box>
        <AlertTitle mb="2" display="flex">
          <AlertIcon mt="1" boxSize="4" />
          See guide on how to check-in
        </AlertTitle>
        <hr />
        <AlertDescription>
          <Text paddingTop="4" fontSize="15">
            By default you're NOT discoverable on login. Toggle{" "}
            <b>Check-in 1</b> to go online for 12 hours. <br /> Click on{" "}
            <b>Check-in 2</b> to go public & explore.
          </Text>
        </AlertDescription>
      </Box>
      <CloseButton
        className="alertCloseBtn"
        position="absolute"
        onClick={onClose}
        right={2}
        top={1}
      />
    </Alert>
  ) : (
    <Button mb={"10"} bg="#404040" onClick={onOpen}>
      Show Check-in Guide
    </Button>
  );
}

export default function SwitchHeader(props: {
  sendApiRequest: () => Promise<void>;
}) {
  const router = useRouter();
  const { sendApiRequest } = props;
  const { initRiderLocation } = useApp();
  const [isLoading, setIsLoading] = useState(false);

  // combines initRiderLocation and sendApiRequest
  const handleCheckIn1 = () => {
    setIsLoading(true);
    initRiderLocation();
    sendApiRequest().finally(() => {
      setIsLoading(false);
    });
  };

  // combines toggleColorMode and router
  const handleCheckIn2 = () => {
    router.push("/connect");
  };

  return (
    <>
      {switchAlert()}
      <HStack w="full">
        <HStack justifyContent="space-between" w="full">
          <Text fontWeight="bold">
            Check-in 1{" "}
            <Badge fontSize="1.5em" colorScheme="grey">
              <TfiHandPointRight />
            </Badge>
          </Text>
          <Switch size="lg" onChange={() => handleCheckIn1()} />
          <Button isLoading={isLoading} onClick={() => handleCheckIn2()}>
            Check-in 2
          </Button>
        </HStack>
      </HStack>
      <br />
    </>
  );
}
