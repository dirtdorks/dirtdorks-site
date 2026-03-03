// Initialize map (Forest Park)
const map = L.map('map', {
  zoomControl: false,
  minZoom: 12,
  maxZoom: 16
}).setView([45.5725, -122.7726], 13);

// Reliable basemap (will NOT go blank)
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; OpenStreetMap contributors',
    opacity: 0.6
  }
).addTo(map);

// Forest Park bounds (locks the map)
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
