import L from 'leaflet';
import 'proj4leaflet';

let maxResolution = 22381.5369193278; // from GeoServer grid set
let resolutions = [];
for (let i = 0; i < 8; i++) {
  resolutions.push(maxResolution / (2**i));
}

let crs = new L.Proj.CRS('EPSG:3035',
  '+proj=laea +lat_0=52 +lon_0=10 +x_0=4321000 +y_0=3210000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', {
    resolutions, 
    origin: [1896628.6179337814, 1097454.5685083764]
  });

export default {
  'map': {
    'bounds': [ [39, 12], [75, 40] ],
    'vendorOptions': { 
      crs,
      minZoom: 1,
      maxZoom: 6
    }
  },
  'layers': [{
    'id': 'osm',
    'params': {
      'layers': 'OSM-Overlay-WMS'
    },
    'type': 'wms',
    'url': 'http://ows.mundialis.de/services/service',
    'attribution': 'OSM Whatever'
  }, {
    'id': 'soil',
    'params': {
      'layers': 'european_soil:soil',
      'tiled': 'TRUE'
    },
    'type': 'wms',
    'url': 'https://geoserver.csgis.de/wms'
  }, {
    'id': 'countries',
    'params': {
      'layers': 'european_soil:countries',
      'tiled': 'TRUE'
    },
    'type': 'wms',
    'url': 'https://geoserver.csgis.de/wms'
  }],
  'getFeatureInfo': {
    'layers': ['soil']
  }
};
