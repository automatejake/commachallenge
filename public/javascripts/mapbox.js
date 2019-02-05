var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
 
mapboxgl.accessToken = 'pk.eyJ1Ijoiam5ldWJhdW0iLCJhIjoiY2pwbjdvdWczMDA2NDQ4c2Qzanhhc2htayJ9.MFdI132qcBDubGdMoH9k5g';
var map = new mapboxgl.Map({
container: 'Map',
style: 'mapbox://styles/mapbox/streets-v10'
});