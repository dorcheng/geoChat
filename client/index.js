import { buildMarker } from './functions';
import mapboxgl from 'mapbox-gl';
import io from 'socket.io-client';

// instantiate map

// public token
mapboxgl.accessToken = 'pk.eyJ1IjoiZG9yY2hlbmciLCJhIjoiY2pnMTR0Z2FpNjVsNTJ4czI0NzVycnNtZCJ9.mLE8zy31_w1RyH_YaFycow';

export const map = new mapboxgl.Map({
  container: 'map-canvas',
  center: [-74.0, 40.7],
  zoom: 12.3,
  pitch: 35,
  bearing: 20,
  style: 'mapbox://styles/mapbox/dark-v9'
});

const socket = io(window.location.origin);

socket.on('connect', function(){
  console.log('I have made a persistent two-way connection to the server!');
});

socket.on('new-user', function(userId){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      console.log('Position:', position.coords);
      buildMarker([position.coords.longitude, position.coords.latitude]).addTo(map);
      map.flyTo({
        center: [position.coords.longitude, position.coords.latitude]
      });
    });
    console.log('New user has joined:', userId);
  }
});

$('form').submit(function(){
  socket.emit('chatMessage', $('#message').val());
  $('#message').val('');
  return false;
});

socket.on('new-message', function(msg){
  $('#chatFeed').append($('<li class="own-message">').text(msg));
});

socket.on('receive-message', function(msg){
  $('#chatFeed').append($('<li class="other-message">').text(msg));
});
