
    var pagecount;
    var myLAT;
    var myLON;
    var api_size;
    var flickrAPI;
    var defaultsize;
    var flickrOptions;

    function FlickrRequest(lat, lng) {

      if (lat != null)
        myLAT = lat;

      if (lng != null)
        myLON = lng;

      flickrAPI = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=12a89bbffb51e4d3c9a0d7d0487a597c&format=json&nojsoncallback=1";
      defaultsize = "Medium 640";

      flickrOptions = {
        tags: keyword,
        lat: myLAT,
        lon: myLON,
        per_page: 12,
        page: 1
      };


      $.getJSON(flickrAPI, flickrOptions, function (json) {
        if (json.photos.total == 0) {
          
          $(".ResultError").css("display", "block");
          $("#page-selection, #photo-result").css("display", "none");
        }
        // $('#photo-result').append('<p class="noresult-error"> NO RESULTS FOUND </p>');

        else {
          $(".ResultError").css("display", "none");
          $('#photo-result').empty();

          try {
            pagecount = json.photos.pages;
          }
          catch (e) {
            // TypeError when method call is undefined/ reason: image returned empty json.
          }

          $.each(json.photos.photo, function (s1, myresult) {
            api_size = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=12a89bbffb51e4d3c9a0d7d0487a597c&photo_id=" + myresult.id + "&format=json&nojsoncallback=1";

            $.getJSON(api_size, function (size) {
              $.each(size.sizes.size, function (s2, myresult_size) {
                if (myresult_size.label == defaultsize) {
                  $('#photo-result').append('<div><img class="f-images" src="' + myresult_size.source + '"></div>');
                }

              });
            });
          });

          $("#photo-result").css("display", "block");
          // $("#page-selection").css("display", "block");
          $('#page-selection').show();

        };
      });
    };