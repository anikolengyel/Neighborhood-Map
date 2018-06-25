//foursquare API keys
var fsClientID = "5EX5WDIQSCH5T0FF44WIBB35B1URTUCF0LKDVK5FBNJPJ5FO";
var fsClientSecret = "KFPB0A0BS5OVVKKBZKCF35YD5OG3FYPQQ1O3MCMQPAGWKSVP";
var oauth_token = "I4AOIKFPDBTV1JHUEUTRKGJ0SW4ONTOMEBNPXGXEPOT0ZSQZ";

//define map as global variable
var map;

//Global ViewModel object
var ViewModel = function() {
  // differrentiate between ViewModel and "local" object
  self = this;
  // create array object
  self.markers = new Array();
  self.search = ko.observable('');

  //initialize map
  this.initMap = function() {
    console.log("Creating map...");
    map = new google.maps.Map(document.getElementById('map'), {
      zoom:15,
      center: {lat: 47.4970, lng: 19.0634},
      styles: styles
    });
  }

  // populator function to bind event listeners, fetch information and animates marker
  this.populateMarker = function(){
    this.setAnimation(google.maps.Animation.BOUNCE);
    this.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
    setTimeout((function() {
        this.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
        this.setAnimation(null);
    }).bind(this), 1200);
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
        this.marker = new google.maps.Marker({
          map: map,
          position: {
            lat: markerData[i].lat,
            lng: markerData[i].lng
          },
          title: markerData[i].name,
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          animation: google.maps.Animation.DROP
        });
        this.marker.setMap(map);
        this.marker.addListener('click', self.populateMarker);
        this.markers.push(this.marker);
      }
  };

  this.fetchInfo = function(marker) {
    console.log("Event listener ", marker.title);
    var markerInfo;
    //regexp for cleaning out position
    var pattern = /[()%]/g;
    var placename;
    var location;


    //GET API request builder
    var searchRequest = "https://api.foursquare.com/v2/venues/search?ll="
    + String(marker.position).replace(pattern, '') + "&name="
    + String(marker.title).split(' ').join('+') + "&intent=match&client_id="
    + fsClientID + "&client_secret=" + fsClientSecret + "&v=20180622";

    //fetch data
    $.getJSON(searchRequest).done(function(data) {
      try {
        markerInfo = data.response.venues[0];
        placename = markerInfo.name;
        address = markerInfo.location.address;
        var venue_id = markerInfo.id;

        var ratingRequest = "https://api.foursquare.com/v2/venues/" + String(venue_id) +
        "?client_id=" + fsClientID + "&client_secret=" + fsClientSecret + "&v=20180622";

        $.getJSON(ratingRequest).done(function(data) {
          try {
            venueRating = data.response.venue.rating;
            
            self.infoWindow.marker = marker;
            self.infoWindow.setContent("<h2>" + placename + "</h2>" + "<h2>" + address + "</h2>" + "<h2> Rating: " + venueRating + "</h2>");
            self.infoWindow.open(map, marker);
          }
          catch (e) {
            console.log("No results for ", marker.title, e);
          }
        });
      }
      catch (e) {
        console.log("No results for ", marker.title, e);
      }
    }).fail(function() {
      console.log("API error at ", marker.title);
    });
  };

  //initialize map
  this.initMap();
  //create infoWindow object
  this.createInfoWindow();
  //create marker data and Google Maps markers
  this.createMarkers();

  this.venues = ko.computed(function() {
    console.log("Update ", self.markers.length," elements");
    // results is for filtering
    var results = [];
    console.log("Filtering for ", self.search());
    for (var i = 0; i < self.markers.length; i++){
        if (self.markers[i].title.toLowerCase().includes(self.search().toLowerCase())){
          results.push(self.markers[i]);
          self.markers[i].setVisible(true);
        } else {
          self.markers[i].setVisible(false);
        };
        //todo: sort the titles by abc
    }
    console.log("Findings: ", results);
    results.sort(compare);
    console.log("sorted results: ", results);
    return results;
  }, this);


};

// a function to sorting the titles by abc
function compare(a,b) {
  if(a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}


$(document).ready(function(){
  ko.applyBindings(new ViewModel());
});
