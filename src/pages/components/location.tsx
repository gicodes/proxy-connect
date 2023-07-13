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

export interface LocationProps {
  isCurrentRider: boolean;
  coords: {
    latitude: number;
    longitude: number;
  } | null;
  text: string;
}

// initialize google map & infoWindow
let map: google.maps.Map, infoWindow: google.maps.InfoWindow;

export function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: new google.maps.LatLng(9.0765, 7.3986),
    zoom: 8,
  });

  infoWindow = new google.maps.InfoWindow();
  // load data coordinates from json file: ignore if none provided
  map.data.loadGeoJson("coordfeed.json");

  // the next 30 lines adds a 'current location' button to the map
  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("map-button");

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter()!);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter()!);
    }
  });
}

// Loop through [results] array and place a marker for each set of coord
export const coordfeed_callback = async function (results: any) {
  for (let i = 0; i < results.features.length; i++) {
    const coords = results.features[i].geometry.coordinates;
    const latLng = new google.maps.LatLng(coords[1], coords[0]);

    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      "marker"
    )) as google.maps.MarkerLibrary;

    // The marker positioned at Federal Capital Territory
    const marker = new AdvancedMarkerElement({
      map: map,
      position: latLng,
      title: "Rider Coordinates",
    });
  }
};

export function handleLocationError(
  browserHasGeolocation: boolean,
  infoWindow: google.maps.InfoWindow,
  pos: google.maps.LatLng
) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed"
      : "Error: Your browser doesn't support geolocation"
  );
  infoWindow.open(map);
}

export default function Location({
  isCurrentRider,
  coords,
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
