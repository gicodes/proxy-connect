// initialize and add the map
let map: google.maps.Map;
const position = {lat: 9.066, lng: 7.483}

export async function initMap(): Promise<void> {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: position,
      zoom: 8,
      mapId: 'DEMO_MAP_ID',
    });
  
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
  // The marker positioned at Federal Capital Territory
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: 'FCT, Abuja'
  });
}