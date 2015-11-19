window.onload = function() {

  var routeDup = new Set();
  var layerArray = [];


  //runs the .done part of an ajax request
  function ajaxDone (res) {
    for (var i = 0; i < res.length; i++) {
      var fullRouteNum = res[i].properties.ROUTE;
      if (!routeDup.has(fullRouteNum)) {
        routeDup.add(fullRouteNum);

        //makes layer on map
        geojson = L.geoJson(res[i], {
          style: style,
          onEachFeature: onEachFeature
          // zoomToFeature
        }).addTo(map).bindPopup(fullRouteNum);
        layerArray.push(geojson);

        $('#selected-routes').append('<span id="route-number" class="' +  fullRouteNum + '">' + fullRouteNum + '</span>');
      }
    }
  }

  //Finds location of click
  function getNearBusRoutes(radius) {
    $.ajax ({
      url: 'http://localhost:3000/api/nearbusroutes/' ,
      type: 'GET',
      data: {
        lng: lng,
        lat: lat,
        radius: radius
      }
    })
    .done(function(res) {
      ajaxDone(res);
    })
    .fail(function(err) {
      console.log(err);
    });
  }

  //User inputs route number and map displays paths
  $('#route-submit').on('click', function(e) {
    e.preventDefault();
    var routeNum = $('#input-route').val();
    $.ajax({
        url: 'http://localhost:3000/api/busroutes/' + routeNum,
        method: 'GET',
    })
    .done(function(res) {
      ajaxDone(res);
    })
    .fail(function(err) {
      console.log(err);
    });
  });

  //clears all layered routes
  $('#clear-routes').on('click', function(e) {
    e.preventDefault();
    routeDup.clear();
    layerArray.forEach(function(element, index, array) {
      array[index].clearLayers();
    });
    layerArray.length = 0;
    $('#selected-routes').empty();
    $('.display').prepend('<label id="selected-routes">Routes Displayed:</label>');
  });

  //checks and displays nearby routes
  $('#map').on('click', '#nearButton', function() {
    console.log('button clicked!');
    getNearBusRoutes(200);
  });

  //array of all bus routes
  var fullRoute = [
   "1" ,
   "10" ,
   "10" ,
   "10" ,
   "101" ,
   "101" ,
   "102" ,
   "105" ,
   "106" ,
   "106" ,
   "107" ,
   "107" ,
   "11" ,
   "111" ,
   "113" ,
   "113" ,
   "114" ,
   "116" ,
   "116" ,
   "118" ,
   "118" ,
   "118" ,
   "118" ,
   "118" ,
   "118" ,
   "118" ,
   "118" ,
   "119" ,
   "119" ,
   "12" ,
   "120" ,
   "121" ,
   "121" ,
   "122" ,
   "123" ,
   "124" ,
   "125" ,
   "128" ,
   "13" ,
   "131" ,
   "131" ,
   "132" ,
   "14" ,
   "14" ,
   "143" ,
   "143" ,
   "148" ,
   "15" ,
   "150" ,
   "150" ,
   "153" ,
   "154" ,
   "156" ,
   "157" ,
   "158" ,
   "159" ,
   "16" ,
   "164" ,
   "166" ,
   "167" ,
   "168" ,
   "169" ,
   "17" ,
   "177" ,
   "178" ,
   "179" ,
   "18" ,
   "180" ,
   "180" ,
   "180" ,
   "181" ,
   "182" ,
   "183" ,
   "186" ,
   "187" ,
   "19" ,
   "190" ,
   "192" ,
   "193" ,
   "197" ,
   "2" ,
   "200" ,
   "201" ,
   "204" ,
   "208" ,
   "21" ,
   "21" ,
   "21" ,
   "212" ,
   "214" ,
   "216" ,
   "217" ,
   "218" ,
   "219" ,
   "22" ,
   "221" ,
   "224" ,
   "226" ,
   "232" ,
   "232" ,
   "234" ,
   "235" ,
   "236" ,
   "237" ,
   "238" ,
   "24" ,
   "24" ,
   "240" ,
   "241" ,
   "242" ,
   "244" ,
   "245" ,
   "246" ,
   "248" ,
   "249" ,
   "25" ,
   "252" ,
   "255" ,
   "255" ,
   "255" ,
   "257" ,
   "26" ,
   "26" ,
   "26" ,
   "268" ,
   "269" ,
   "27" ,
   "271" ,
   "277" ,
   "28" ,
   "28" ,
   "29" ,
   "3" ,
   "30" ,
   "301" ,
   "301" ,
   "301" ,
   "303" ,
   "303" ,
   "304" ,
   "308" ,
   "309" ,
   "31" ,
   "311" ,
   "311" ,
   "312" ,
   "316" ,
   "32" ,
   "33" ,
   "33" ,
   "330" ,
   "331" ,
   "331" ,
   "342" ,
   "342" ,
   "345" ,
   "346" ,
   "346" ,
   "347" ,
   "348" ,
   "355" ,
   "36" ,
   "36" ,
   "37" ,
   "37" ,
   "372" ,
   "373" ,
   "4" ,
   "40" ,
   "41" ,
   "43" ,
   "43" ,
   "44" ,
   "47" ,
   "48" ,
   "48" ,
   "49" ,
   "49" ,
   "49" ,
   "5" ,
   "5" ,
   "5" ,
   "50" ,
   "522" ,
   "522" ,
   "540" ,
   "542" ,
   "545" ,
   "55" ,
   "550" ,
   "554" ,
   "554" ,
   "555" ,
   "556" ,
   "556" ,
   "56" ,
   "57" ,
   "599" ,
   "60" ,
   "601" ,
   "628" ,
   "628" ,
   "630" ,
   "631" ,
   "64" ,
   "65" ,
   "66" ,
   "661" ,
   "67" ,
   "671" ,
   "672" ,
   "673" ,
   "674" ,
   "675" ,
   "676" ,
   "68" ,
   "688" ,
   "7" ,
   "7" ,
   "7" ,
   "7" ,
   "7" ,
   "70" ,
   "71" ,
   "71" ,
   "71" ,
   "71" ,
   "72" ,
   "72" ,
   "72" ,
   "72" ,
   "73" ,
   "73" ,
   "73" ,
   "73" ,
   "74" ,
   "75" ,
   "76" ,
   "77" ,
   "773" ,
   "775" ,
   "8" ,
   "82" ,
   "83" ,
   "84" ,
   "84" ,
   "891" ,
   "892" ,
   "894" ,
   "9" ,
   "901" ,
   "903" ,
   "906" ,
   "907" ,
   "908" ,
   "910" ,
   "913" ,
   "914" ,
   "915" ,
   "916" ,
   "917" ,
   "930" ,
   "931" ,
   "952" ,
   "952" ,
   "973" ,
   "975" ,
   "98" ,
   "980" ,
   "981" ,
   "982" ,
   "984" ,
   "986" ,
   "987" ,
   "988" ,
   "989" ,
   "99" ,
   "994" ,
   "995" ,
   "999" ,
  ];

  //makes drop down for bus routes
  function makeBusList() {
    fullRoute.sort(function(a, b) {
      return a - b;
    });

    var sortedFullRoute = $.unique(fullRoute);

    // console.log(fullRoute);
    sortedFullRoute.forEach(function(element, index, fullRoute) {
      $('#input-route').append('<option value="' + element + '">' + element + '</option>');
    });
  };
  makeBusList();
};
