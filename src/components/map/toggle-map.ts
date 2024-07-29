import seeLocation from "./view-location";

export function toggleMap(open: boolean) {
    const mapElement = document.getElementById("main");
    const locationElement = document.getElementById("location-bar");
  
    if (mapElement && locationElement) {
      if (open) {
        mapElement.removeAttribute("hidden");
        locationElement.setAttribute("hidden", "true");
      } else {
        mapElement.setAttribute("hidden", "true");
        locationElement.removeAttribute("hidden");
      }
    } else {
      console.warn("Map or location element not found");
    }
  }

  export function goToMaps() {
    toggleMap(true);
    return seeLocation();
  }