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

export interface LocationRefProps {
  coords: {
    latitude: number;
    longitude: number;
  } | null;
  text: string;
  isCurrentUser: boolean;
}

export default function LocationCoords({
  isCurrentUser,
  coords,
  text,
}: LocationRefProps) {
  return (
    <VStack align="flex-start" w="full">
      <HStack>
        <Avatar />
        <Heading size="md">{isCurrentUser ? "You" : text}</Heading>
      </HStack>

      <StatGroup borderWidth="1px" w="full" p="4">
        <Stat>
          <StatLabel>Latitude</StatLabel>
          <StatNumber>{coords?.latitude}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Longitude</StatLabel>
          <StatNumber>{coords?.longitude}</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
          </StatHelpText>
        </Stat>
      </StatGroup>
    </VStack>
  );
}
