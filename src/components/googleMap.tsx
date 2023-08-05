// instantiate google map & infoWindow
let map: google.maps.Map;
let infoWindow: google.maps.InfoWindow;

export async function initMap(
  center: google.maps.LatLngLiteral
): Promise<void> {
  // load the "map" HTML element using Google Maps Javascript API instance
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center,
    zoom: 8,
  });

  infoWindow = new google.maps.InfoWindow();

  // the next 10 lines adds a 'current location' button
  const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("map-button");

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  locationButton.addEventListener("click", () => {
    infoWindow.setPosition(center);
    infoWindow.setContent("Location found");
    infoWindow.open(map);
    map.setCenter(center);
  });
}
