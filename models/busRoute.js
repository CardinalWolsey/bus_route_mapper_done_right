//TODO: update file


var mongoose = require('mongoose');

var busRouteSchema = new mongoose.Schema({
  type: {type: String, default: "Feature"},
  properties: {
    ROUTE: {type: String, required: true},
    RTE_NUM: {type: String, required: true},
    RTE_PART: {type: String, default: null},
    SVC_TYPE: String,
    Shape_len: Number
  },
  geometry: {
    type: {type: String, required: true},
    coordinates: {type: Array, required: true}
  }
}, {collection: 'routes'});

busRouteSchema.index({ geometry : '2dsphere' });

module.exports = mongoose.model('busRoute', busRouteSchema);
