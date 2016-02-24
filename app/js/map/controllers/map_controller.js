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
    $scope.busRouteDatas = null;
    $scope.busRoutes = [];
    // var routesLayerGroup = L.layerGroup([busRoutes]);

    $scope.displayRoute = function(route) {
      $http.get('/api/busroutes/' + route)
        .then(function(res) {
          //could make this cleaner
          $scope.busRouteDatas = res.data;
          $scope.busRoutes.push(res.data);
          console.log($scope.busRouteDatas);
          console.log($scope.busRoutes);

          leafletData.getMap().then(function(map) {
            L.geoJson($scope.busRouteDatas).addTo(map);
          });
        }, function(err) {
          console.log(err);
          console.log(err.data);
        });
      };

    $scope.clearRoutes = function(route) {
      $scope.busRouteDatas = null;
      leafletData.getMap().then(function(map) {
        L.geoJson($scope.busRouteDatas).addTo(map);
      });
    }
  }]);
  //
  // app.controller('TableController', ['$scope', function($scope) {
  //   $scope.consoleLog = function() {
  //     console.log('this is a test ' + $scope.busRouteDatas);
  //   };
  // }]);

}
