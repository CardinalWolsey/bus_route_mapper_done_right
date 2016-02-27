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

    $scope.busRouteDatas = null;
    $scope.busRoutes = [];
    // var routesLayerGroup = L.layerGroup([busRoutes]);

    $scope.displayRoute = function(route) {
      $http.get('/api/busroutes/' + route)
        .then(function(res) {
          //could make this cleaner
          $scope.busRouteDatas = res.data;
          for (var i = 0; i < res.data.length; i++) {
            $scope.busRoutes.push(res.data[i]);
          }
          console.log($scope.busRouteDatas);
          console.log($scope.busRoutes);

          leafletData.getMap().then(function(map) {
            var newLayer = L.geoJson($scope.busRouteDatas);
            $scope.layerGroup.addLayer(newLayer);
            map.fitBounds(newLayer);
          });
        }, function(err) {
          console.log(err);
          console.log(err.data);
        });
      };

    $scope.clearRoutes = function() {
      $scope.busRouteDatas = null;
      $scope.busRoutes = null;
      $scope.layerGroup.clearLayers();
      console.log('somepthing stupid');
    }
  }]);

}
