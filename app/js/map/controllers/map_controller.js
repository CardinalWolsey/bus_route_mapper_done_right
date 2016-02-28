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

    var colorLibrary = [{inUse: false, colorFamily: ["#08519c", "#3182bd", "#6baed6", "#bdd7e7", "#eff3ff"]},
                        {inUse: false, colorFamily: ["#006d2c", "#31a354", "#74c476", "#bae4b3", "#edf8e9"]},
                        {inUse: false, colorFamily: ["#54278f", "#756bb1", "#9e9ac8", "#cbc9e2", "#f2f0f7"]},
                        {inUse: false, colorFamily: ["#a50f15", "#de2d26", "#fb6a4a", "#fcae91", "#fee5d9"]},
                        {inUse: false, colorFamily: ["#99540F", "#B26F2C", "#CC8E51", "#E5B17E", "#FFD8B2"]},
                        {inUse: false, colorFamily: ["#252525", "#636363", "#969696", "#cccccc", "#f7f7f7"]}];

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
