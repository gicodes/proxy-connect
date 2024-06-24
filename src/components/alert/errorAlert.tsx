import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Text,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

const DefaultErrorAlert = ({
  header,
  body,
}: {
  header: ReactNode;
  body: ReactNode;
}) => {
  return (
    <Alert mt="10" status={"error"}>
      <Box w={"full"}>
        <AlertTitle mb="1" display="flex">
          <AlertIcon mt="1" boxSize="4" />
          <span className="ml-6">{header}</span>
        </AlertTitle>
        <hr />
        <AlertDescription className="text-center text-lg text-bold text-white-500">
          <Text m={"10"}>{body}</Text>
        </AlertDescription>
        <Text mt={"30"} className="error-info-text text-center">
          This message is generated from Ryder-GP's default template
        </Text>
      </Box>
    </Alert>
  );
};

export default DefaultErrorAlert;
