// Initialize map (Forest Park)
const map = L.map('map', {
  zoomControl: false
}).setView([45.5725, -122.7726], 13);

// Lighter Topographic Base Map
L.tileLayer(
'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
{
attribution: '&copy; OpenStreetMap',
opacity: 0.65
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

