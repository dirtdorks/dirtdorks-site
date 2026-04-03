// Initialize map centered deep inside Forest Park trail network
const map = L.map('map', {
  zoomControl: false,
  minZoom: 14,
  maxZoom: 16,
  tap: true,
  tapTolerance: 15,
  touchZoom: true,
  bounceAtZoomLimits: false
}).setView([45.5725, -122.7726], 14);

// OpenTopoMap — contours + named trails
L.tileLayer(
  'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  {
    attribution: '© <a href="https://www.opentopomap.org">OpenTopoMap</a> | © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 16,
    subdomains: ['a', 'b', 'c'],
    opacity: 0.55
  }
).addTo(map);

// Dark forest overlay — heavy enough to suppress city detail
L.rectangle(
  L.latLngBounds([44.0, -124.5], [46.5, -121.0]),
  {
    color: 'transparent',
    fillColor: '#0a1a0f',
    fillOpacity: 0.65,
    interactive: false
  }
).addTo(map);

// Forest Park bounds — locks map so you can't pan to the city
const forestParkBounds = L.latLngBounds(
  [45.523, -122.835],
  [45.610, -122.705]
);
map.setMaxBounds(forestParkBounds);
map.on('drag', function () {
  map.panInsideBounds(forestParkBounds, { animate: false });
});

// Trails — outer glow
new L.GPX('trails/forest-park-trails.gpx', {
  async: true,
  polyline_options: { color: '#2dff7a', weight: 16, opacity: 0.08, lineCap: 'round' },
  marker_options: { startIconUrl: null, endIconUrl: null, shadowUrl: null }
}).addTo(map);

// Trails — mid glow
new L.GPX('trails/forest-park-trails.gpx', {
  async: true,
  polyline_options: { color: '#4cdc80', weight: 10, opacity: 0.18, lineCap: 'round' },
  marker_options: { startIconUrl: null, endIconUrl: null, shadowUrl: null }
}).addTo(map);

// Trails — inner glow
new L.GPX('trails/forest-park-trails.gpx', {
  async: true,
  polyline_options: { color: '#7ef5a8', weight: 6, opacity: 0.35, lineCap: 'round' },
  marker_options: { startIconUrl: null, endIconUrl: null, shadowUrl: null }
}).addTo(map);

// Trails — sharp highlight
new L.GPX('trails/forest-park-trails.gpx', {
  async: true,
  polyline_options: { color: '#c8ffdc', weight: 2.5, opacity: 1, lineCap: 'round' },
  marker_options: { startIconUrl: null, endIconUrl: null, shadowUrl: null }
}).on('loaded', e => {
  map.fitBounds(e.target.getBounds());
}).addTo(map);
