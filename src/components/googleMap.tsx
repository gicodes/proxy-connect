import MapContainer from "./mapContainer";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry`;

export default function Map() {
  const containerStyles: any = {
    height: "100%",
    width: "100%",
    position: "relative",
  };

  return (
    <MapContainer
      googleMapURL={MAP_URL}
      loadingElement={<div style={containerStyles} />}
      containerElement={<div style={containerStyles} />}
      mapElement={<div style={containerStyles} />}
      rider={{
        id: 0,
        position: {
          lat: 0,
          lng: 0,
        },
      }}
      radius={0}
      riders={[]}
      channel={undefined}
    />
  );
}
