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

    var colorLibrary = [{inUse: false, colorFamily: ["#08306b", "#08519c", "#2171b5", "#4292c6", "#6baed6"]},
                        {inUse: false, colorFamily: ["#00441b", "#006d2c", "#238b45", "#41ab5d", "#74c476"]},
                        {inUse: false, colorFamily: ["#3f007d", "#54278f", "#6a51a3", "#807dba", "#9e9ac8"]},
                        {inUse: false, colorFamily: ["#67000d", "#a50f15", "#cb181d", "#ef3b2c", "#fb6a4a"]},
                        {inUse: false, colorFamily: ["#99540F", "#B26F2C", "#CC8E51", "#E5B17E", "#FFD8B2"]},
                        {inUse: false, colorFamily: ["#000000", "#252525", "#525252", "#737373", "#969696"]}];

    var findColorFamily = function() {
      for (var i = 0; i < colorLibrary.length; i++) {
        if (colorLibrary[i].inUse === false) {
          colorLibrary[i].inUse = true;
          return colorLibrary[i].colorFamily;
        }
      }
      return colorLibrary[5].colorFamily;
    }

    $scope.displayRoute = function(route) {
      $http.get('/api/busroutes/' + route)
        .then(function(res) {

          var routeColor = findColorFamily();
          console.log(routeColor);

          for (var i = 0; i < res.data.length; i++) {
            var newLayer = L.geoJson(res.data[i], {
              style: {"color": routeColor[i%5]}
            });
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
