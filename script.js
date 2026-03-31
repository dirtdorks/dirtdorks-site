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

// OpenTopoMap basemap — shows contours + named trails
L.tileLayer(
  'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  {
    attribution: '© <a href="https://www.opentopomap.org">OpenTopoMap</a> | © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 16,
    subdomains: ['a', 'b', 'c'],
    opacity: 0.92
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

// Forest Park Trails — glow layer (underlay)
new L.GPX('trails/forest-park-trails.gpx', {
  async: true,
  polyline_options: {
    color: '#4c8f6b',
    weight: 8,
    opacity: 0.25,
    lineCap: 'round'
  },
  marker_options: {
    startIconUrl: null,
    endIconUrl: null,
    shadowUrl: null
  }
}).addTo(map);

// Forest Park Trails — main highlight layer
new L.GPX('trails/forest-park-trails.gpx', {
  async: true,
  polyline_options: {
    color: '#b6f2c2',
    weight: 4,
    opacity: 1,
    lineCap: 'round'
  },
  marker_options: {
    startIconUrl: null,
    endIconUrl: null,
    shadowUrl: null
  }
}).on('loaded', e => {
  map.fitBounds(e.target.getBounds());
}).addTo(map);
