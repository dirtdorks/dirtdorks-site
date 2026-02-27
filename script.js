// Initialize map (Forest Park)
const map = L.map('map', {
  zoomControl: false
}).setView([45.5725, -122.7726], 13);

// Lighter Topographic Base Map
L.tileLayer(
  'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; OpenStreetMap contributors'
  }
).addTo(map);

// Forest Park GPX Trails - Lichen Green
new L.GPX('trails/forest-park-trails.gpx', {
  async: true,
  polyline_options: {
    color: '#8FAF7B',   // lichen green
    weight: 4,
    opacity: 0.95
  },
  marker_options: {
    startIconUrl: null,
    endIconUrl: null,
    shadowUrl: null
  }
}).on('loaded', e => {
  map.fitBounds(e.target.getBounds());
}).addTo(map);