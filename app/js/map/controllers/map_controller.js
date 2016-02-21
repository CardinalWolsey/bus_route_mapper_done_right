module.exports = function(app) {

  app.controller('MapsController', ['$scope', function($scope) {
    $scope.showMap = true;
  }]);

  app.controller('RouteController', ['$scope', '$http', function($scope, $http) {
    $scope.busRouteData = null;

    $scope.displayRoute = function(route) {
      $http.get('/api/busroutes:' + route)
        .then(function(res) {
          $scope.busRouteData = res.data;
          console.log($scope.busRouteData);
        }, function(err) {
          console.log(err)
        });
      }
  }])

}
