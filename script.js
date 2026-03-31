// Initialize map (Forest Park)
const map = L.map('map', {
  zoomControl: false,
  minZoom: 12,
  maxZoom: 16,
  // Mobile: allow single-finger pan, pinch-to-zoom
  tap: true,
  tapTolerance: 15,
  touchZoom: true,
  bounceAtZoomLimits: false
}).setView([45.5725, -122.7726], 13);
 
// OpenTopoMap basemap — contours + named trails
L.tileLayer(
  'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  {
    attribution: '© <a href="https://www.opentopomap.org">OpenTopoMap</a> | © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 16,
    subdomains: ['a', 'b', 'c'],
    opacity: 0.72  // slightly dimmed so the dark overlay + trails dominate
  }
).addTo(map);
 
// Dark forest overlay — suppresses city streets, lets trails pop
const darkOverlay = L.rectangle(
  L.latLngBounds([44.0, -124.5], [46.5, -121.0]),
  {
    color: 'transparent',
    fillColor: '#0a1a0f',
    fillOpacity: 0.45,
    interactive: false
  }
).addTo(map);
 
// Forest Park bounds (locks the map inside the park)
const forestParkBounds = L.latLngBounds(
  [45.523, -122.835], // southwest
  [45.610, -122.705]  // northeast
);
map.setMaxBounds(forestParkBounds);
map.on('drag', function () {
  map.panInsideBounds(forestParkBounds, { animate: false });
});
 
// Forest Park Trails — outer glow (widest, most transparent)
new L.GPX('trails/forest-park-trails.gpx', {
  async: true,
  polyline_options: {
    color: '#2dff7a',
    weight: 16,
    opacity: 0.08,
    lineCap: 'round'
  },
  marker_options: { startIconUrl: null, endIconUrl: null, shadowUrl: null }
}).addTo(map);
 
// Forest Park Trails — mid glow layer
new L.GPX('trails/forest-park-trails.gpx', {
  async: true,
  polyline_options: {
    color: '#4cdc80',
    weight: 10,
    opacity: 0.18,
    lineCap: 'round'
  },
  marker_options: { startIconUrl: null, endIconUrl: null, shadowUrl: null }
}).addTo(map);
 
// Forest Park Trails — inner glow
new L.GPX('trails/forest-park-trails.gpx', {
  async: true,
  polyline_options: {
    color: '#7ef5a8',
    weight: 6,
    opacity: 0.35,
    lineCap: 'round'
  },
  marker_options: { startIconUrl: null, endIconUrl: null, shadowUrl: null }
}).addTo(map);
 
// Forest Park Trails — main highlight line (sharp, bright)
new L.GPX('trails/forest-park-trails.gpx', {
  async: true,
  polyline_options: {
    color: '#c8ffdc',
    weight: 2.5,
    opacity: 1,
    lineCap: 'round'
  },
  marker_options: { startIconUrl: null, endIconUrl: null, shadowUrl: null }
}).on('loaded', e => {
  map.fitBounds(e.target.getBounds());
}).addTo(map);
 
