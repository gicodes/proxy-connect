import { initMap } from "@/components/map/googleMap";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export default function SeeLocation() {
  // useEffect instance to load the Maps API by adding inline bootstrap
  if (!(typeof google === "object" && typeof google.maps === "object")) {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?
        key=${API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  if (navigator.geolocation) {
    // get lat & long coordinates from `navigator.geolocation`
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      // var center as lat and lng coordinates
      const center = {
        lat: latitude,
        lng: longitude,
      };
      try {
        window.initMap = function () {
          initMap(center);
        };
      } catch (err: any) {
        // console.error(`Client CL: ${err.message}`);
        return;
      }
    });
  }

  return;
}
