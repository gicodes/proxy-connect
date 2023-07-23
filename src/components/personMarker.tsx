import React, { useEffect, useState } from "react";
import { Marker } from "@react-google-maps/api";
import { LatLngLiteral } from "./userMarker";

const BLACK_MARKER = "https://i.imgur.com/8dOrls4.png?2";
const GREEN_MARKER = "https://i.imgur.com/9v6uW8U.png";

export interface RiderMarkerProps {
  user: { id: any; position: LatLngLiteral };
  rider: any;
  channel?: any;
  radius: number;
  withinRegion(
    position: LatLngLiteral | null
  ): (userPosition: LatLngLiteral | null, radius: number) => boolean;
}

const RiderMarker: React.FC<RiderMarkerProps> = ({
  user,
  rider,
  channel,
  radius,
  withinRegion,
}) => {
  const [markerPosition, setMarkerPosition] = useState<LatLngLiteral | null>(
    rider.position || null
  );
  const [userMarkerPosition, setUserMarkerPosition] =
    useState<LatLngLiteral | null>(user.position || null);

  useEffect(() => {
    if (channel) {
      channel.bind(
        "transit",
        ({
          rider = {},
        }: {
          rider?: { id?: number; position?: LatLngLiteral };
        }) => {
          const { id: riderId, position: riderPosition } = rider;
          if (riderId === rider.id) setMarkerPosition(riderPosition || null);
          if (riderId === user.id) setUserMarkerPosition(riderPosition || null);
        }
      );
    }
  }, [channel, rider.id, user.id]);

  const within = !!withinRegion(markerPosition)(userMarkerPosition, radius);

  const MARKER_SIZE: google.maps.Size = new google.maps.Size(25, 35);
  const MARKER_ICON: google.maps.Icon = {
    url: within ? GREEN_MARKER : BLACK_MARKER,
    scaledSize: MARKER_SIZE,
  };

  const markerOptions = {
    title: rider.name,
    position: { lat: markerPosition?.lat, lng: markerPosition?.lng },
    icon: MARKER_ICON,
  };

  return markerPosition ? <Marker {...markerOptions} /> : null;
};

export default RiderMarker;
