// Initialize map (Forest Park)
const map = L.map('map', {
  zoomControl: false,
  minZoom: 12,
  maxZoom: 16,
  tap: true,
  tapTolerance: 15,
  touchZoom: true,
  bounceAtZoomLimits: false
}).setView([45.5725, -122.7726], 13);

// OpenTopoMap basemap
L.tileLayer(
  'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  {
    attribution: '© <a href="https://www.opentopomap.org">OpenTopoMap</a> | © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 16,
    subdomains: ['a', 'b', 'c'],
    opacity: 0.88
  }
).addTo(map);

// Forest Park bounds (locks the map inside the park)
const forestParkBounds = L.latLngBounds(
  [45.523, -122.835],
  [45.610, -122.705]
);
map.setMaxBounds(forestParkBounds);
map.on('drag', function () {
  map.panInsideBounds(forestParkBounds, { animate: false });
});

// ── Forest Park boundary mask ──
// Draws a dark inverted polygon: world minus the park interior.
// Everything outside Forest Park goes dark; only the park shows through.
fetch('forest-park-boundary.geojson')
  .then(r => r.json())
  .then(geojson => {

    const parkCoords = geojson.geometry.coordinates[0];

    // World bounding box — covers the entire globe
    const worldRing = [
      [90, -180], [90, 180], [-90, 180], [-90, -180], [90, -180]
    ];

    // Convert GeoJSON [lng, lat] → Leaflet [lat, lng]
    const parkRing = parkCoords.map(([lng, lat]) => [lat, lng]);

    // Inverted polygon: world with a park-shaped hole punched out
    L.polygon([worldRing, parkRing], {
      color: 'transparent',
      fillColor: '#0a1a0f',
      fillOpacity: 0.88,
      interactive: false,
      smoothFactor: 1
    }).addTo(map);

    // Subtle glowing edge around the park boundary
    L.polygon([parkRing], {
      color: '#2a5c3a',
      weight: 2,
      opacity: 0.5,
      fill: false,
      interactive: false,
      smoothFactor: 1
    }).addTo(map);

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
  marker_options: { startIconUrl: null, endIconUrl: null, shadowUrl: null }
}).on('loaded', e => {
  map.fitBounds(e.target.getBounds());
}).addTo(map);
 
