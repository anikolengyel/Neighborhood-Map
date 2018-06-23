var styles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]

var locations = [
    {
      location: {"lat": 47.4970, "lng": 19.0634},
      name: "Szimpla Kert",
      place_id: "ChIJ5Q3SoELcQUcRpB0x-9NCdyY"
    },
    {
      location: {"lat": 47.501341, "lng": 19.06528},
      name: "Instant",
      place_id: "ChIJ3RbjiB3cQUcRMR6GqCXvzzk"
    },
    {
      location: {"lat" : 47.500737, "lng" : 19.059082},
      name: "Aker't",
      place_id: "ChIJeUfBw2vcQUcRsBNLJjNNazA"
    },
    {
      location: {"lat" : 47.5005917, "lng" : 19.0692819},
      name: "Fogas haz",
      place_id: "ChIJSXAClWjcQUcRGx30AEH0nZY"
    },
    {
      location: {"lat" : 47.4960738, "lng" : 19.0654356},
      name: "Corvin Club & Roof Terrace",
      place_id: "ChIJ13TLfGfcQUcRaUEdSMYgIeg"
    }
  ]


var markers = [];
var map;
var markers = [];

var fsClientID = "5EX5WDIQSCH5T0FF44WIBB35B1URTUCF0LKDVK5FBNJPJ5FO";
var fsClientSecret = "KFPB0A0BS5OVVKKBZKCF35YD5OG3FYPQQ1O3MCMQPAGWKSVP";


var ViewModel = function() {
  var self = this;

  this.places = ko.observableArray(locations);

};

initMap = function() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom:13,
    center: {lat: 47.4970, lng: 19.0634},
    styles: styles
  });
  console.log("the map is ready!");

  for (var i = 0; i < locations.length; i++) {
    // Get the position from the location array.
    var position = locations[i].location;
    var title = locations[i].name;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });
    markers.push(marker);
    //console.log(markers);
  }
  var addressArray = getFsInfo();
  console.log(addressArray);
  populateInfowindow = function(addressArray, map, marker) {
    for(var i = 0; i < addressArray.length; i++) {
      var markerInfo = addressArray[i];
      console.log("markerInfo: ", markerInfo);
      var infowindow = new google.maps.InfoWindow({
        content: markerInfo
      });
      console.log("marker: ", marker);
      marker.addListener('click', function () {
        infowindow.open(map, marker);
      })
    }
    console.log('We created the markers with listeners!');
  }
  populateInfowindow();

}

getFsInfo = function() {
  var addressArray = [];

  for(var i = 0; i<markers.length; i++) {
    var markerPosition = String(markers[i].position);
    var markerTitle = String(markers[i].title);
    var markerPosition = markerPosition.replace('(','');
    var markerPosition = markerPosition.replace(')','');
    var markerPosition = markerPosition.replace('%','');
    var markerPosition = markerPosition.replace(' ','');
    //console.log(markerPosition);
    var markerTitle = markerTitle.split(' ').join('+');
    //console.log(markerTitle);

    var urlString = "https://api.foursquare.com/v2/venues/search?ll="
    + markerPosition + "&name="
    + markerTitle + "&intent=match&client_id="
    + fsClientID + "&client_secret=" + fsClientSecret + "&v=20180622";

    //console.log(urlString);

    $.getJSON(urlString, function(data) {
      var markerInfo = data.response.venues[0].location.formattedAddress
      //console.log(markerInfo);
      addressArray.push(markerInfo);
      console.log(addressArray);
    });
  }
  console.log("type: ", typeof addressArray);
  return addressArray;
}

populateInfowindow = function(infoArray, map, marker) {
  for(var i = 0; i<infoArray.length; i++) {
    var markerInfo = infoArray[i];
    console.log("markerInfo: ", markerInfo);
    var infowindow = new google.maps.InfoWindow({
      content: markerInfo
    });
    console.log("marker: ", marker);
    marker.addListener('click', function () {
      infowindow.open(map, marker);
    })
  }
  console.log('We created the markers with listeners!');

}


$(document).ready(function(){
  ko.applyBindings(new ViewModel());

})
