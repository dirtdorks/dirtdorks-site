// Initialize map (Forest Park)
const map = L.map('map', {
  zoomControl: false
}).setView([45.5725, -122.7726], 13);

// Lighter Topographic Base Map
L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution:'&copy; OpenStreetMap contributors',
    opacity: 0.6
}
).addTo(map);

// Forest Park GPX Trails - Lichen Green
polyline_options: {
color: '#b6f2c2', // brighter forest green
weight: 4, // thicker = emphasis
opacity: 1,
lineCap: 'round'
}

  },
  marker_options: {
    startIconUrl: null,
    endIconUrl: null,
    shadowUrl: null
  }
}).on('loaded', e => {
  map.fitBounds(e.target.getBounds());

}).addTo(map);


