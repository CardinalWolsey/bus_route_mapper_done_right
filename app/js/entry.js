require('./leaflet');
require('angular/angular');
// require('angular-route');
var angular = window.angular;
require('./directives/angular-leaflet-directive');
// require('./Leaflet.MakiMarkers.js');
// require('./multi-select');
// require('angular-material');

var mapApp = angular.module('MapApp', []);
require('./map/map')(mapApp);
