import RiderMarker, { RiderMarkerProps } from "./personMarker";
import UserMarker, { LatLngLiteral, UserMarkerProps } from "./userMarker";
import { GoogleMap } from "@react-google-maps/api";
import React, { Fragment, useRef } from "react";

const MapContainer: React.FC<{
  googleMapURL: string;
  loadingElement: any;
  containerElement: any;
  mapElement: any;
  rider: { id: number; position: { lat: number; lng: number } };
  radius: number;
  riders: Array<{ id: number; position: { lat: number; lng: number } }>;
  channel: any;
}> = (props) => {
  const mapRef = useRef<GoogleMap | null>(null);

  const withinRegion = (
    position: { lat: number; lng: number },
    radius: number
  ) => {
    const to = new google.maps.LatLng(position.lat, position.lng);
    const distance = google.maps.geometry.spherical.computeDistanceBetween;
    return (point: { lat: number; lng: number }) => {
      const from = new google.maps.LatLng(point.lat, point.lng);
      return distance(from, to) <= radius;
    };
  };

  const {
    rider: { id, position },
    radius,
    riders,
    channel,
  } = props;

  return (
    <GoogleMap zoom={15} center={position}>
      <Fragment>
        {riders.map((rider, index) => {
          const withinRegionFn = (point: { lat: number; lng: number }) =>
            withinRegion(position, radius)(point);

          const markerProps: UserMarkerProps = {
            key: index,
            radius,
            rider,
            channel,
            withinRegion: withinRegionFn,
          };

          const riderProps: RiderMarkerProps = {
            user: rider,
            radius: 0,
            withinRegion: function (
              position: LatLngLiteral | null
            ): (userPosition: LatLngLiteral | null, radius: number) => boolean {
              throw new Error("Function not implemented.");
            },
            rider,
          };

          return rider.id === id ? (
            <UserMarker {...markerProps} />
          ) : (
            <RiderMarker {...riderProps} />
          );
        })}
      </Fragment>
    </GoogleMap>
  );
};

export default MapContainer;
