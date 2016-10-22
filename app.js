var mapOptions = {
  zoom: 10,
  center: new google.maps.LatLng(-21.151445,55.5604605)
}

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var points = [
    {
      latlng: new google.maps.LatLng(-20.881277, 55.450941),
      text: '26&deg;C'
    },
    {
      latlng: new google.maps.LatLng(-21.144721, 55.791173),
      text: '30&deg;C'
    },
    {
      latlng: new google.maps.LatLng(-21.340558, 55.511022),
      text: '32&deg;C'
    },
    {
      latlng: new google.maps.LatLng(-21.202347, 55.579000),
      text: '28&deg;C'
    }
  ];
  var overlay = new CustomOverlay(points, map);
}

google.maps.event.addDomListener(window, 'load', initMap);




CustomOverlay.prototype = new google.maps.OverlayView();

/** @constructor */
function CustomOverlay(points, map) {

  // Initialize all properties.
  this._points = points;
  this._map = map;

  this._divs = new Array;

  // Explicitly call setMap on this overlay.
  this.setMap(map);
}

CustomOverlay.prototype._createDiv = function(point) {


  var div = document.createElement('div');
  div.style.borderStyle = 'none';
  div.style.borderWidth = '0px';
  div.style.position = 'absolute';

  var span = document.createElement('span');
  span.innerHTML = point.text;
  span.className = 'overlay-span';
  div.appendChild(span);

  console.log(div)
  return div;

};

/**
* onAdd is called when the map's panes are ready and the overlay has been
* added to the map.
*/
CustomOverlay.prototype.onAdd = function() {
  var panes = this.getPanes();
  var that = this;
  this._points.forEach(function(point) {
    var div = that._createDiv(point);
    that._divs.push(div);

    // Add the element to the "overlayLayer" pane.
    panes.overlayLayer.appendChild(div);
  });

}

CustomOverlay.prototype.draw = function() {

  var overlayProjection = this.getProjection();
  var that = this;
  this._points.forEach(function(point, index) {
    var pos = overlayProjection.fromLatLngToDivPixel(point.latlng);
    var div = that._divs[index];
    div.style.left = pos.x + 'px';
    div.style.top = pos.y + 'px';
  });
};

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
CustomOverlay.prototype.onRemove = function() {
  this._divs.forEach(function(div) {
    div.parentNode.removeChild(div);
  });
  this._divs = new Array;
};
