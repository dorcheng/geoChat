import { MAPBOX_ACCESS_TOKEN } from '../config';
import { buildMarker } from './functions';
import mapboxgl from 'mapbox-gl';
import io from 'socket.io-client';

// instantiate map

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN || MAPBOX_ACCESS_TOKEN;

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
