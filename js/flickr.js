
var pagecount;
var myLAT;
var myLON;
function FlickrRequest(lat, lng) {

  if (lat != null)
    myLAT = lat;

  if (lng != null)
    myLON = lng;

  var flickrAPI = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=12a89bbffb51e4d3c9a0d7d0487a597c&format=json&nojsoncallback=1";
  var defaultsize = "Medium 800";
  var photoHTML = "";

  var flickrOptions = {
    tags: keyword,
    lat: myLAT,
    lon: myLON,
    per_page: 12,
    page: 1
  };


  $.getJSON(flickrAPI, flickrOptions, function (json) {
    if (json.photos.total == 0) {
      $(".ResultError").css("display", "block");
      $("#page-selection").css("display", "none");
    }
    // $('#photo-result').append('<p class="noresult-error"> NO RESULTS FOUND </p>');

    else {
      $(".ResultError").css("display", "none");
      $('#photo-result').empty();

      if (json.photos.pages != 0 || json.photos.pages != undefined){
        pagecount = json.photos.pages;
      }
        else{
        // TypeError when method call is undefined/ reason: image returned empty json.
        pagecount = 0;
      
        }

    $.each(json.photos.photo, function (s1, myresult) {
      var api_size = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=12a89bbffb51e4d3c9a0d7d0487a597c&photo_id=" + myresult.id + "&format=json&nojsoncallback=1";

      $.getJSON(api_size, function (size) {
        $.each(size.sizes.size, function (s2, myresult_size) {
          if (myresult_size.label == defaultsize) {
            $('#photo-result').append('<div><img class="f-images" src="' + myresult_size.source + '"></div>');
          }

        });
      });
    });

    $("#photo-result").css("display", "block");

    if(pagecount > 1)
    $("#page-selection").css("display", "block");

  };
});



$('#page-selection').bootpag({
  total: pagecount,
  page: 1,
  maxVisible: 5,
  leaps: true,
  firstLastUse: true,
  first: '←',
  last: '→',
  wrapClass: 'pagination',
  activeClass: 'active',
  disabledClass: 'disabled',
  nextClass: 'next',
  prevClass: 'prev',
  lastClass: 'last',
  firstClass: 'first'
}).on("page", function (event, num) {
  //FlickrRequest(null,null,num);

  var bootpagOptions = {
    page: num,
    tags: keyword,
    lat: myLAT,
    lon: myLON,
    per_page: 12
  };

getPagImages(flickrAPI, bootpagOptions,defaultsize);
});
};

function getPagImages(flickrAPI, bootpagOptions, defaultsize){

  $.getJSON(flickrAPI, bootpagOptions, function (json) {
    alert(0);

    $('#photo-result').empty();

    $.each(json.photos.photo, function (s1, myresult) {
      var api_size = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=12a89bbffb51e4d3c9a0d7d0487a597c&photo_id=" + myresult.id + "&format=json&nojsoncallback=1";

      $.getJSON(api_size, function (size) {
        $.each(size.sizes.size, function (s2, myresult_size) {
          if (myresult_size.label == defaultsize) {
            // no results here
            $('#photo-result').append('<div><img class="f-images" src="' + myresult_size.source + '"></div>');

          };
        });
      });
    });
    alert(1);
  });


};






// var keyword;
// var location;


// $(document).ready(function(){


// var lol = encodeURIComponent("New York, NY");

//  window.onload = document.getElementById("qs").addEventListener("click", function(){
//  keyword = $("#keyword").val();
//     location = $("location").val();

//  initiateFlickrRequest(40.7127837,-74.0059413);

//  });

//  $(document).ready(function(){
//   $('.query-submit').click(function(){

// $('#stts').removeClass('selected');
// $(this).addClass('selected');

// keyword = $("#keyword").val();
// location = encodeURIComponent( document.getElementById("location-text").value );
// $("#location-text").val());

// locationEncoder(location);




            // photoHTML += '<div>';
            // photoHTML += '<img class="f-images" src="' + myresult_size.source + '">';
            // photoHTML += '</div>';








  // $("#photo-result").append('<div class="')
              // photoHTML += '<div><img onclick="testit(this.src);" src="' + myresult_size.source + '"></div>';

  // $("photo-result").append ('<div class="gallery_product col-lg-4 col-md-4 col-sm-4 col-xs-6" id="221"> <img onclick="testit(this.src);"class="img-responsive" src="' + myresult_size.source + '"></div>' );
              // $("#photo-result").append ('<p><a href="' + myresult_size.url + '" target="_blank"><img src="' + myresult_size.source + '"/></a></p>');

  // end button click
// }); // end ready



//https://stackoverflow.com/questions/5617952/jquery-how-do-i-get-the-url-of-an-anchor-contained-within-a-clicked-li-tag


//  $.each(data.items, function(i, photo){
//         photoHTML += '<li class="imagedsc">';
//         photoHTML += '<a href="' + photo.link + '" class="img-responsive">';
//         photoHTML += '<img class="img-thumbnail" src="' + photo.media.m + '"></a></li>';
//       });

  // $.each(data.items, function(i, photo){
  //       photoHTML += '<div class="gallery_product col-lg-4 col-md-4 col-sm-4 col-xs-6" id="221">';
  //       photoHTML += '<img onclick="testit(this.src);"class="img-responsive" src="' + photo.media.m + '">';
  //       photoHTML += '</div>';
  //     });

// var photoHTML = '<div class="w3-container">';

//       $.each(data.items, function(i, photo){
//         photoHTML += '<div class="w3-card-2" style="width:50%">';
//         photoHTML += '<img style="width:100%"src="' + photo.media.m + '">';
//         // photoHTML += '<div class="w3-container">';
//         photoHTML += '<div class="w3-container"><h4 class="titlefont"><b>'+ photo.title +'</b></h4><p></p></div>';
//         photoHTML += '</div>';
//         photoHTML += '<br><br>';
//             });

//       photoHTML += '</div><br><br>';
//       $('#photo-result').html(photoHTML);


    // function displayPhotos(data) {
    //   var photoHTML="";

    //   $.each(data.items, function(i, photo){
    //     photoHTML += '<div>';
    //     photoHTML += '<p> + photo.id + </p>';
    //     // photoHTML += '<div class="w3-container">';
    //     // photoHTML += '<div class="w3-container"><h4 class="titlefont"><b>'+ photo.title +'</b></h4><p></p></div>';
    //     photoHTML += '</div>';
    //         });

    //   photoHTML += '</div><br><br>';
    //   $('#photo-result').html(photoHTML);
    // }; // end displayPhotos callback function