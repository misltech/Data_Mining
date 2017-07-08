  
    function init(usource) {
      
      var currentImg = usource;
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api-us.faceplusplus.com/facepp/v3/detect?api_key=N_lfn0Xk155RUZj83eBglvtRoWM1QFdr&api_secret=wFWG_FRfUrjhQGlPeJ9azjAH6UVQospR&image_url=" + currentImg + "&return_attributes=gender%2Cage%2Csmiling%2Ceyestatus%2Cethnicity",
        "method": "POST",
        "Content-Type": "application/jsonp" //dont change to reg json.. Will ruin photo order.
      }

      $.ajax(settings).done(function (response) {
        display(response);
      })
        .fail(function (xhr, textStatus, errorThrown) {
          alert("Slow down!! We dont have enough funding for your requests :)");
          $(thisObject).css("opacity", 1);
         

        });

      function display(response) {

        cumulativeData = { smile: 0, gender: { M: 0, F: 0 }, ethnicity: "", age: 0 };
        ErrorData = { smile: "Data Unavailable", gender: "Data Unavailable", ethnicity: "Data Unavailable", age: "Data Unavailable" };
        Data = { smile: 0, gender: "", ethnicity: "", age: 0 };
        ArrayLength = response.faces.length;

        if (response.faces.length == 0) {
          $('#testresult').append('<div class="col-sm-3"><div class="thumbnail fpimg"><img class="eimg" src="' + currentImg + '">' + '<div class="caption">' + '<p>Age : <span class="age-data">' + ErrorData.age + '</span></p>' + '<p> Gender : ' + ErrorData.gender + '</span></p>' + '<p> Smile : ' + '<span class="data-smile">' + ErrorData.smile + '</span></p>' + '<p> Location : ' + '<span class="data-location">' + $("#location").val() + '</span>' + '</div></div></div>');
        }

        else {

          if (response.faces.length > 1) {


            for (i = 0; i < response.faces.length; i++) {

              if (response.faces[i].attributes.smile.value != null) {
                cumulativeData.smile += response.faces[i].attributes.smile.value;
              }

              if (response.faces[i].attributes.gender.value != null) {
                if (response.faces[i].attributes.gender.value == "Male")
                  cumulativeData.gender.M++;

                if (response.faces[i].attributes.gender.value == "Female")
                  cumulativeData.gender.F++;
              }

              if (response.faces[i].attributes.age.value != null) {
                cumulativeData.age += response.faces[i].attributes.age.value;
              }

              if (response.faces[i].attributes.ethnicity.value != null) {
                cumulativeData.ethnicity += response.faces[i].attributes.ethnicity.value;
              }

            }

            cumulativeData.smile = cumulativeData.smile / ++ArrayLength;
            cumulativeData.age = cumulativeData.age / response.faces.length;
            $('#testresult').append('<div class="col-sm-3"><div class="thumbnail fpimg"><img class="eimg" src="' + currentImg + '">' + '<div class="caption">' + '<p>Age * : <span class="age-data">' + Math.round(cumulativeData.age) + '</span></p>' + '<p> Gender: M: <span class="data-male">' + cumulativeData.gender.M + '</span>' + ' F: <span class="data-female">' + cumulativeData.gender.F + '<p> Smile * : ' + '<span class="data-smile">' + Math.round(cumulativeData.smile) + '</span></p>' + '<p> Location : ' + '<span class="data-location">' + $("#location").val() + '</span>' + '</div></div></div>');
          }

          else {
            if (response.faces[0].attributes.smile.value != null) {
              Data.smile = response.faces[0].attributes.smile.value;
            }

            if (response.faces[0].attributes.gender.value != null) {
              Data.gender = response.faces[0].attributes.gender.value;
            }

            if (response.faces[0].attributes.ethnicity.value != null) {
              Data.ethnicity = response.faces[0].attributes.ethnicity.value;
            }
            if (response.faces[0].attributes.age.value != null) {
              Data.age = response.faces[0].attributes.age.value;
            }
            $('#testresult').append('<div class="col-sm-3"><div class="thumbnail fpimg"><img class="eimg" src="' + currentImg + '"><div class="caption">' + '<p>Age : <span class="age-data">' + Data.age + '</span></p>' + '<p> Gender: ' + Data.gender + '<p> Smile : ' + '<span class="data-smile">' + Data.smile + '</span></p>' + '<p> Location : ' + '<span class="data-location">' + $("#location").val() + '</span>' + '</div></div></div>');
          }

        }

        usource = null;
      }
    };
