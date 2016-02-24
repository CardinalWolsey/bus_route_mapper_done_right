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
    $scope.busRouteData = null;

    $scope.displayRoute = function(route) {
      $http.get('/api/busroutes/' + route)
        .then(function(res) {
          //could make this cleaner
          $scope.busRouteData = res.data;
          console.log($scope.busRouteData);

          leafletData.getMap().then(function(map) {
            L.geoJson($scope.busRouteData).addTo(map);
          });
        }, function(err) {
          console.log(err);
          console.log(err.data);
        });

      };


  }])

}
