//foursquare API keys
var fsClientID = "5EX5WDIQSCH5T0FF44WIBB35B1URTUCF0LKDVK5FBNJPJ5FO";
var fsClientSecret = "KFPB0A0BS5OVVKKBZKCF35YD5OG3FYPQQ1O3MCMQPAGWKSVP";

//define map as global variable
var map;

//Global ViewModel object
var ViewModel = function() {
  // differrentiate between ViewModel and "local" object
  self = this;
  // create array object
  this.markers = new Array();

  //initialize map
  this.initMap = function() {
    console.log("Creating map...");
    map = new google.maps.Map(document.getElementById('map'), {
      zoom:15,
      center: {lat: 47.4970, lng: 19.0634},
      styles: styles
    });
  }

  // marker populator function to bind event listeners
  this.populateMarker = function(){
    self.fetchInfo(this);
  };

  // create ViewModel infoWindow
  this.createInfoWindow = function() {
      console.log("Creating infowindow...");
      self.infoWindow = new google.maps.InfoWindow();
  };

  this.createMarkers = function() {
    var markerData = [];

    console.log("Creating marker data from locations...");
    for (var i = 0; i < locations.length; i++) {
      var obj = {name:"", lat:"", lng:""};

      obj.name =  locations[i].name;
      obj.lat = locations[i].location.lat;
      obj.lng = locations[i].location.lng;

      markerData.push(obj);
    }
    console.log("Created markers: ", markerData);
    self.createMapsMarkers(markerData);
  };

  this.createMapsMarkers = function(markerData){
      //create Google Maps markers
      for (var i in markerData){
        console.log("Adding ", markerData[i].name)
        this.marker = new google.maps.Marker({
          map: map,
          position: {
            lat: markerData[i].lat,
            lng: markerData[i].lng
          },
          title: markerData[i].name,
          animation: google.maps.Animation.DROP
        });
        this.marker.setMap(map);
        this.markers.push(this.marker);
        this.marker.addListener('click', self.populateMarker);
      }
  };

  this.fetchInfo = function(marker) {
    console.log("Event listener ", marker.title);
    var markerInfo;
    //regexp for cleaning out position
    var pattern = /[()%]/g;

    //GET API request builder
    var urlString = "https://api.foursquare.com/v2/venues/search?ll="
    + String(marker.position).replace(pattern, '') + "&name="
    + String(marker.title).split(' ').join('+') + "&intent=match&client_id="
    + fsClientID + "&client_secret=" + fsClientSecret + "&v=20180622";

    //fetch data
      $.getJSON(urlString).done(function(data) {
        try {
          markerInfo = data.response.venues[0];
          console.log("Fetched: ", marker.title, markerInfo);
        }
        catch (e) {
          console.log("No results for ", marker.title);
        }

      }).fail(function() {
        console.log("API error at ", marker.title);
      });
      self.infoWindow.marker = marker;
      self.infoWindow.setContent("<h2>" + marker.title + "</h2>" + String(markerInfo));
      self.infoWindow.open(map, marker);
  };

  this.initMap();
  this.createInfoWindow();
  this.createMarkers();
  console.log(self)
};




$(document).ready(function(){
  ko.applyBindings(new ViewModel());
});
