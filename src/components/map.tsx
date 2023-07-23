import React, { useEffect } from "react";

// initialize map & infoWindow
let map: google.maps.Map, infoWindow: google.maps.InfoWindow;

// initialize api key with NEXT PUBLIC
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

// initialize google map and map variables
export function initMap() {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: new google.maps.LatLng(9.0765, 7.3986),
    zoom: 6,
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

// export handler for Location error on map
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

// map and map variables are rendered in this constructor
const MapConstructor = () => {
  useEffect(() => {
    if (!(typeof google === "object" && typeof google.maps === "object")) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=
      ${apiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    window.initMap = function () {
      initMap();
    };
  }, []);

  return (
    <>
      <main>
        <div
          id="map"
          className="map mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"
        ></div>
      </main>
    </>
  );
};

export default MapConstructor;
