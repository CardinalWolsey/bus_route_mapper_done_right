var mongoose = require('mongoose');

var busRouteSchema = new mongoose.Schema({
  type: {type: String, default: "Feature"},
  properties: {
    ROUTE: String,
    RTE_NUM: String,
    RTE_PART: {type: String, default: null},
    SVC_TYPE: String,
    Shape_len: Number
  },
  geometry: {
    type: {type: String, default: "MultiLineString"},
    coordinates: Array
  }
}, {collection: 'routes'});

module.exports = mongoose.model('busRoute', busRouteSchema);
