// instantiate map & infoWindow
let map: google.maps.Map, infoWindow: google.maps.InfoWindow;

// initialize google map & infoWindow functions
export function initMap(center: google.maps.LatLngLiteral): void {
  infoWindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center,
    zoom: 8,
  });

  // the next 10 lines adds a 'current location' button to the map
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
