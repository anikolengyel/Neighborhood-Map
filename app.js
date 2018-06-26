//define API keys
var fsClientID = "5EX5WDIQSCH5T0FF44WIBB35B1URTUCF0LKDVK5FBNJPJ5FO";
var fsClientSecret = "KFPB0A0BS5OVVKKBZKCF35YD5OG3FYPQQ1O3MCMQPAGWKSVP";

//define map
var map;

//creating the viewModel object
var ViewModel = function() {
  // differrentiate between ViewModel and "local" object
  self = this;
  // create an array to store the markers
  self.markers = new Array();
  // creting an observable to bind the user's search query
  self.search = ko.observable('');

  //initialize map woth a darkblue style
  // the theme is from https://mapstyle.withgoogle.com/ - Aubergine style
  this.initMap = function() {
    console.log("Creating map...");
    map = new google.maps.Map(document.getElementById('map'), {
      zoom:15,
      center: {lat: 47.4970, lng: 19.0634},
      styles: styles
    });
  }

  // populator function to bind event listeners, fetch information and animate markers
  this.populateMarker = function(){
    // set the animation to bounce
    this.setAnimation(google.maps.Animation.BOUNCE);
    // change the icon color to red for the selected marker
    this.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
    setTimeout((function() {
        // after timeout, change the color back to blue
        this.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
        // stop the animation
        this.setAnimation(null);
    }).bind(this), 1200);
    // get the place info for the marker
    self.fetchInfo(this);
  };

  // create infoWindow for the markers
  this.createInfoWindow = function() {
      console.log("Creating infowindow...");
      self.infoWindow = new google.maps.InfoWindow();
  };

  // get the data for markers from the model (locations)
  this.createMarkerData = function() {
    // creating an array to store the markerd data objects
    var markerData = [];

    console.log("Creating marker data from locations...");
    for (var i = 0; i < locations.length; i++) {
      var obj = {name:"", lat:"", lng:""};

      obj.name =  locations[i].name;
      obj.lat = locations[i].location.lat;
      obj.lng = locations[i].location.lng;

      // append the marker data objects to the array
      markerData.push(obj);
    }
    console.log("Created markers: ", markerData);
    // create marker based on the marker data
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
        // add an eventListener to populate the map for user click
        this.marker.addListener('click', self.populateMarker);
        // appending the marker to the markers array
        this.markers.push(this.marker);
      }
  };

  // get Foursquare info for the infowindow
  // we need the address and the rating
  this.fetchInfo = function(marker) {
    console.log("Event listener ", marker.title);
    var markerInfo;
    //regexp for cleaning out position
    var pattern = /[()%]/g;
    var placename;
    var location;

    //build the API request to get the location and venue_id
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

        // with the venue_id, build another request string to get the rating
        var ratingRequest = "https://api.foursquare.com/v2/venues/" + String(venue_id) +
        "?client_id=" + fsClientID + "&client_secret=" + fsClientSecret + "&v=20180622";

        $.getJSON(ratingRequest).done(function(data) {
          try {
            venueRating = data.response.venue.rating;

            // after the requests are done, set the content for the infowindow
            self.infoWindow.marker = marker;
            self.infoWindow.setContent("<h2>" + placename + "</h2>" + "<h2>" + address + "</h2>" + "<h2> Rating: " + venueRating + "</h2>");
            self.infoWindow.open(map, marker);
          }
          // handling the exceptions
          catch (e) {
            console.log("No information for ", marker.title, e);
          }
        });
      }
      catch (e) {
        console.log("No results for ", marker.title, e);
      }
    }).fail(function() {
      console.log("API error here: ", marker.title);
    });
  };

  //initialize map
  this.initMap();
  //create infoWindow object
  this.createInfoWindow();
  //create marker data and Google Maps markers
  this.createMarkerData();


  // a function to get the user results and show the markers
  this.venues = ko.computed(function() {
    console.log("Update ", self.markers.length," elements");
    // array to store the search results
    var filteredResults = [];
    console.log("Filtering for ", self.search());
    for (var i = 0; i < self.markers.length; i++){
      // if the search query contains the marker title, append the title
      // to the results
        if (self.markers[i].title.toLowerCase().includes(self.search().toLowerCase())){
          filteredResults.push(self.markers[i]);
          // set visible the particular markers
          self.markers[i].setVisible(true);
        } else {
          self.markers[i].setVisible(false);
        };
        //todo: sort the titles by abc
    }
    console.log("Findings: ", filteredResults);
    // sort the results by abc
    filteredResults.sort(compare);
    console.log("sorted results: ", filteredResults);
    return filteredResults;
  }, this);


};

// a helper function to sorting the titles by abc
function compare(a,b) {
  if(a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}

// when the html is downloaded, apply the bindings
$(document).ready(function(){
  ko.applyBindings(new ViewModel());
});
