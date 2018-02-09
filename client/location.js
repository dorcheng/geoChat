export const getUserLocation = (id, createMarker) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      createMarker([position.coords.longitude, position.coords.latitude])
      console.log(id, position.coords.latitude, position.coords.longitude);
    });
  } else {
    console.log(id, 'Geolocation is not supported by this browser.');
  }
};
