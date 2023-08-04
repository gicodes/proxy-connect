import {
  Avatar,
  Heading,
  HStack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  VStack,
} from "@chakra-ui/react";

interface LocationProps {
  isCurrentRider: Boolean;
  coordinates:
    | {
        latitude?: number;
        longitude?: number;
      }
    | undefined;
  text: string;
}

export default function Location({
  isCurrentRider,
  coordinates,
  text,
}: LocationProps) {
  return (
    <VStack align="flex-start" w="full">
      <HStack>
        <Avatar />
        <Heading size="md">{isCurrentRider ? "You" : text}</Heading>
      </HStack>

      <StatGroup borderWidth="1px" w="full" p="4">
        <Stat>
          <StatLabel>Latitude</StatLabel>
          <StatNumber>{coordinates?.latitude}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Longitude</StatLabel>
          <StatNumber>{coordinates?.longitude}</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
          </StatHelpText>
        </Stat>
      </StatGroup>
    </VStack>
  );
}
