import mapboxgl from 'mapbox-gl';

export const buildMarker = (coords, id) => {
  const markerEl = document.createElement('div');
  const popup = new mapboxgl.Popup({closeButton: false}).setText(`userId: ${id}`);
  markerEl.style.backgroundSize = 'contain';
  markerEl.style.width = '32px';
  markerEl.style.height = '37px';
  markerEl.style.backgroundImage = `url("http://i.imgur.com/WbMOfMl.png")`;
  return new mapboxgl.Marker(markerEl).setLngLat(coords).setPopup(popup);
};
