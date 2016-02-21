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

  app.controller('RouteController', ['$scope', '$http', function($scope, $http) {
    $scope.busRouteData = null;

    $scope.displayRoute = function(route) {
      $http.get('/api/busroutes/' + route)
        .then(function(res) {
          $scope.busRouteData = res.data;
          console.log($scope.busRouteData);
        }, function(err) {
          console.log(err)
        });
      }
  }])

}
