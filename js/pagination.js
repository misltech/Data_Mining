$('#page-selection').hide();

    $('#page-selection').bootpag({
      total: 5,
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

      var flickrOptions = {
        page: num,
        tags: keyword,
        lat: myLAT,
        lon: myLON,
        per_page: 12
      };

      $.getJSON(flickrAPI, flickrOptions, function (json) {
        if (json.photos.total == 0) {
          $(".ResultError").css("display", "block");
        }
        else {
          $(".ResultError").css("display", "none");
          $('#photo-result').empty();

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

        };

      });
      //});


      if (pagecount > 250) {
        $(this).bootpag({ total: 250 });
      }
      else {
        $(this).bootpag({ total: pagecount });
      }
    });