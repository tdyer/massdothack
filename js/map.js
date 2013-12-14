var map;
var pathClick = function(pairId) {
  $('#chart svg').children().remove()

  // Add Travel Chart
  nv.addGraph(function() {
   var chart = nv.models.lineChart();

   chart.xAxis
       .axisLabel('Time')
       .tickFormat(d3.format(',r'));

   chart.yAxis
       .axisLabel('Travel Time (minutes)')
       .tickFormat(d3.format('.0f'));

   d3.select('#chart svg')
       .datum(sinAndCos())
     .transition().duration(500)
       .call(chart);

   nv.utils.windowResize(function() { d3.select('#chart svg').call(chart) });

   return chart;
  });
  
  /**************************************
  * Simple test data generator
  */

  function sinAndCos() {
    var sin = [],
       cos = [];

    for (var i = 0; i < 100; i++) {
     sin.push({x: i, y: Math.sin(i/10)});
     cos.push({x: i, y: .5 * Math.cos(i/10)});
    }

    return [
     {
       values: sin,
       key: '90th Percentile',
       color: '#ff7f0e'
     },
     {
       values: cos,
       key: 'Average',
       color: '#2ca02c'
     }
    ];
  }
}

function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(42.358056, -71.063611),
    zoom: 9
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

  for (var i=0; i<segments.length; i++) {
    var addSegment = function(segmentData) {
      var segment = [
        new google.maps.LatLng(segmentData[1], segmentData[2]),
        new google.maps.LatLng(segmentData[3], segmentData[4])
      ];

      var path = new google.maps.Polyline({
        path: segment,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        pairId: segmentData[0]
      });
      google.maps.event.addListener(path, 'click', function() {
        pathClick(path.pairId);
      });
      path.setMap(map);

    };
    addSegment(segments[i]);
  }
}
google.maps.event.addDomListener(window, 'load', initialize);