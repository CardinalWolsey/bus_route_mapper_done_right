module.exports = function(app) {

  app.controller('MapsController', ['$scope', function($scope) {
    $scope.showMap = true;
    angular.extend($scope, {
                seattle: {
                  lat: 47.6,
                  lng: -122.33,
                  zoom: 12
                },
                defaults: {
                  scrollWheelZoom: false,
                  tap: false
                }
              });

  }]);

  app.controller('RouteController', ['$scope', '$http', 'leafletData', function($scope, $http, leafletData) {
    $scope.layerGroup = null;

    leafletData.getMap().then(function(map) {
      $scope.layerGroup = L.layerGroup().addTo(map);
    });

    $scope.busRouteDatas = [];

    $scope.displayRoute = function(route) {
      $http.get('/api/busroutes/' + route)
        .then(function(res) {

          for (var i = 0; i < res.data.length; i++) {
            var newLayer = L.geoJson(res.data[i]);
            $scope.layerGroup.addLayer(newLayer);
            res.data[i].leafletLayer = newLayer;
            $scope.busRouteDatas.push(res.data[i]);
          }
          console.log($scope.busRouteDatas);
          $scope.busRoute = null;

        }, function(err) {
          console.log(err);
          console.log(err.data);
        });
      };

    $scope.deleteRoute = function(layer) {
      $scope.layerGroup.removeLayer(layer.leafletLayer);
      $scope.busRouteDatas.splice($scope.busRouteDatas.indexOf(layer), 1);
    }

    $scope.clearRoutes = function() {
      $scope.busRouteDatas = [];
      $scope.layerGroup.clearLayers();
      console.log('somepthing stupid');
    }
  }]);

}
