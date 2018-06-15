var L = require('leaflet');

function bricjs(opts, map) {
  var controller;
  var calls = 0;

  map.on('click', function (e) {
    calls++;
    map.getContainer().style.cursor = 'wait';

    var c = new AbortController();
    if (controller) controller.abort();
    controller = c;

    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    var params = [
      'QUERY_LAYERS=european_soil:soil',
      'LAYERS=european_soil:soil',
      'BBOX=' + [lng, lat, lng + 1e-7, lat + 1e-7].join(','),
      'WIDTH=1', 'HEIGHT=1',
      'X=0', 'Y=0',
      'SERVICE=WMS',
      'SRS=EPSG:4326',
      'REQUEST=GetFeatureInfo',
      'INFO_FORMAT=text/html'
    ];
    var url = 'https://geoserver.csgis.de/wms?' + params.join('&');

    function finishCall() {
      calls--;
      if (calls === 0) map.getContainer().style.cursor = '';
    }

    fetch(url, { signal: controller.signal }).then(function (r) {
      finishCall();
      return r.text();
    }).then(function (html) {
      if (!html.includes('Ziffer')) return;
      L.popup()
        .setLatLng([lat, lng])
        .setContent(html)
        .openOn(map);
    }).catch(function (error) {
      finishCall();
      console.log(error); // eslint-disable-line no-console
    });
  });
}

module.exports = { bricjs: bricjs };
