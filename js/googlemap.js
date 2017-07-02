
function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('location')),
    { types: ['geocode'] });

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

}

function locationEncoder(location) {

var lat = 0;
var lon = 0;
//var page = 1
  var res = encodeURIComponent(location);

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDXxwQQFKd1MnsNS7uM2CaZHPdQO6KSeAE&address=" + res + "",
    "method": "POST"
  }


  $.ajax(settings).done(function (response) {

    if (response.status == "OK") {
      lat = response.results[0].geometry.location.lat;
      lon = response.results[0].geometry.location.lng;
    }

    FlickrRequest(lat,lon);
  });

  
}
















//BREAKK


// // var location = "uluru";
// // window.onload = function initMap() {
//     function initMap(){
//     var uluru = { lat: -25.363, lng: 131.044 };
//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 4,
//         center: uluru
//     });
//     var marker = new google.maps.Marker({
//         position: uluru,
//         map: map
//     });

// };

// window.onload = function initMap () {
    //         function initMap () {
    //         var infoWindow = new google.maps.InfoWindow();
    //         var latlngbounds = new google.maps.LatLngBounds();
    //         var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //         var mapOptions = {
    //             center: new google.maps.LatLng(40.712784, -74.005941),
    //             zoom: 6,
    //             mapTypeId: google.maps.MapTypeId.ROADMAP
    //         };


    //         google.maps.event.addListener(map, 'click', function (e) {
    //             alert("Latitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng());
    //            placeMarker(e.latLng);
    //         });

    //     //     var marker = new google.maps.Marker({
    //     //   position: function t(l,ll){ return l + ll},
    //     //   map: map,
    //     //     });
    // };
