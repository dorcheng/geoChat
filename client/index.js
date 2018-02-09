import { MAPBOX_ACCESS_TOKEN } from '../config';
import { buildMarker } from './marker';
import { getUserLocation } from './location';
import mapboxgl from 'mapbox-gl';
import io from 'socket.io-client';

const socket = io(window.location.origin);

socket.on('connect', function(){
  console.log('I have made a persistent two-way connection to the server!');
});

socket.on('new-user', function(userId){
  getUserLocation(userId, buildMarker);
});

// instantiate map

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const map = new mapboxgl.Map({
  container: 'map-canvas',
  center: [-74.0, 40.7],
  zoom: 12.3,
  pitch: 35,
  bearing: 20,
  style: 'mapbox://styles/mapbox/dark-v9'
});
