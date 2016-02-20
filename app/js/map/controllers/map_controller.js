module.exports = function(app) {
  app.controller('MapsController', ['$scope', function($scope) {
    $scope.showMap = true;
  }]);
}
