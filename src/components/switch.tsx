import { useApp } from "@/lib/utils/socketLocationProvider";
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
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { TfiHandPointRight } from "react-icons/tfi";

// function UI-component that displays UX-flow guide
function switchAlert() {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true });

  return isVisible ? (
    <Alert mb="5" status="info">
      <Box>
        <AlertTitle mb="2" display="flex">
          <AlertIcon mt="1" boxSize="4" />
          See guide on how to check-in
        </AlertTitle>
        <hr />
        <AlertDescription>
          <Text paddingTop="4" fontSize="15">
            By default you're NOT discoverable on login. Toggle{" "}
            <b>Check-in 1</b> to go online for 12 hours <br /> Click on{" "}
            <b>Check-in 2</b> to go public & explore. This action changes your
            theme instance!
          </Text>
        </AlertDescription>
      </Box>
      <CloseButton
        alignSelf="flex-start"
        position="absolute"
        right={2}
        top={1}
        onClick={onClose}
      />
    </Alert>
  ) : (
    <Button onClick={onOpen}>Show Alert</Button>
  );
}

// this function component is crucial to index page
// func: initRiderlocation, toggleColorMode, router
export default function SwitchHeader(props: {
  sendApiRequest: () => Promise<void>;
}) {
  const router = useRouter();
  const { sendApiRequest } = props;
  const { initRiderLocation } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

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
    toggleColorMode();
    router.push("/explore");
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
          <Switch
            // the Switch initializes rider Location
            defaultChecked={colorMode === "light"}
            size="lg"
            onChange={() => handleCheckIn1()}
          />
          <Button isLoading={isLoading} onClick={() => handleCheckIn2()}>
            Check-in 2
          </Button>
        </HStack>
      </HStack>
      <br />
    </>
  );
}
