# Neighborhood-Map

The repository contains a Neighborhood Map project work for Udacity's Full Stack Nanodegree.
This is a simple webpage application, running AJAX requests and fetch information from
Foursquare and Google Maps. The MVC architecture is implemented with Knockout.
The project was inspired by the unique nightlife in Budapest and includes some of the best pubs
worth visiting there.

The functionality includes map markers to identify the locations and display further information
about the place. The app allows the user to filter places on the list and displays the marker's
information on the map. If you click a marker, you can get the city address and the rating of the place.

# Setup

Clone this repository.

The repository contains:
- application.py - this file operates the program, implements view model's functionality
and create connection between the UI and the database
- styles.js - contains the custom style for the Google Maps map. Source: https://developers.google.com/maps/documentation/javascript/styling
- style.css - contains the css file for the webpage
- index.html
- locations.js - contains the list of dictionaries with the place coordinates and place names
- knockout-3.2.0.js
- this README.md file

# Running

Open index.html and filter for any place in the list or click any marker for further information.
