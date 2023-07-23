import React, { Fragment, useEffect, useState } from "react";
import { Marker, Circle } from "@react-google-maps/api";

interface Rider {
  id?: string | null;
  position?: google.maps.LatLngLiteral | null;
}

export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export interface UserMarkerProps {
  key: any;
  radius: number;
  rider: {
    id?: number;
    position?: LatLngLiteral;
    name?: string;
  };
  channel?: any;
  withinRegion(point: LatLngLiteral): boolean;
}

const UserMarker: React.FC<UserMarkerProps> = ({ rider, channel, radius }) => {
  const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(
    rider.position || null
  );

  useEffect(() => {
    if (channel) {
      channel.bind(
        "transit",
        ({ rider: updatedRider = {} }: { rider: Rider }) => {
          const { id, position } = updatedRider;
          if (id === rider.id && position) {
            setPosition(position);
          }
        }
      );
    }
  }, [channel, rider.id]);

  const MARKER_SIZE = new google.maps.Size(50, 70);
  const MARKER_ICON = "https://i.imgur.com/Rhv5xQh.png";

  return (
    <Fragment>
      {position && (
        <Marker
          position={position}
          title="You"
          icon={{
            url: MARKER_ICON,
            scaledSize: MARKER_SIZE,
          }}
        />
      )}
      {position && <Circle center={position} radius={radius} />}
    </Fragment>
  );
};

export default UserMarker;
