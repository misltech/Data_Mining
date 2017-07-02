function init(usource) {

    var currentImg = usource;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api-us.faceplusplus.com/facepp/v3/detect?api_key=N_lfn0Xk155RUZj83eBglvtRoWM1QFdr&api_secret=wFWG_FRfUrjhQGlPeJ9azjAH6UVQospR&image_url=" + currentImg + "&return_attributes=gender%2Cage%2Csmiling%2Ceyestatus%2Cethnicity",
        "method": "POST",
        "content-type": "application/jsonp"
    }

    $.ajax(settings).done(function (response) {
        display(response);
    });

    function display(response) {

            cumulativeData = {smile : 0, gender : {M:0, F:0}, ethnicity : "", age : 0};
            Data = {smile : 0, gender : "", ethnicity : "", age : 0};
            ArrayLength = response.faces.length;

                if (response.faces.length >= 1) {

                try{

            for (i = 0;  i < response.faces.length; i++) {

                if (response.faces[i].attributes.smile != "null") {
                    cumulativeData.smile += response.faces[i].attributes.smile.value;
                }
                // else
                // cumulativeData.smile = "Data Unavailable";

                
                if (response.faces[i].attributes.gender != "null") {
                    if(response.faces[i].attributes.gender.value == "Male")
                    cumulativeData.gender.M++;

                    if(response.faces[i].attributes.gender.value == "Female")
                    cumulativeData.gender.F++;
                }
                // else
                // cumulativeData.gender = "Data Unavailable";


                
                if (response.faces[i].attributes.age != "null") {
                    cumulativeData.age += response.faces[i].attributes.age.value;
                }
                // else
                // cumulativeData.age = "Data Unavailable";
                

                if (response.faces[i].attributes.ethnicity != "null") {
                    cumulativeData.ethnicity += response.faces[i].attributes.ethnicity.value;
                }
                // else
                // cumulativeData.age = "Data Unavailable";
                } 
            }
            catch(e){
                cumulativeData.smile = "Data Unavailable";
                cumulativeData.gender = "Data Unavailable";
                cumulativeData.age = "Data Unavailable";
                cumulativeData.ethnicity = "Data Unavailable";
            
                } 
            if(cumulativeData.smile == "Data Unavailable" || cumulativeData.age == "Data Unavailable" ){
                return;
            }

            else{

            cumulativeData.smile = cumulativeData.smile/ ++ArrayLength;
            cumulativeData.age = cumulativeData.age/response.faces.length;
        }
        
            $('#testresult').append('<div class="col-sm-4"><div class="thumbnail fpimg"><img class="eimg" src="'+ currentImg + '">' + '<div class="caption">' + '<p>Age * : <span class="age-data">'+ Math.round(cumulativeData.age) + '</span></p>' + '<p> Gender: M: <span class="data-male">' + cumulativeData.gender.M + '</span>' + ' F: <span class="data-female">' + cumulativeData.gender.F + '<p> Smile * : ' +'<span class="data-smile">' + Math.round(cumulativeData.smile) + '</span></p>' + '<p> Location : '+'<span class="data-location">'+ $("#location").val() +'</span>' + '</div></div></div>');
            usource = "null";

            //old source: '<div class="thumbnail col-md-6 fpimg"> <img class="filtered-img" src=' + currentImg + '>' + '<div class="caption">' + '<p>' + "Average Age: " + cumulativeData.age + '</p>' + '<p>' + "Males: " + cumulativeData.gender.M +'</p>'+'<p>' + "Females: " + cumulativeData.gender.F +'</p>' + '<p>' + "Average Smile: " + cumulativeData.smile + '</p>' + '</div></div>'
        }
        
       else{
                try{
            if (response.faces.attributes.smile != "null") {
                Data.smile = response.faces.attributes.smile.value;

            }
            // else {
            //     Data.smile = "Data Unavailable";

            // }
            if (response.faces.attributes.gender != "null") {
            Data.gender = response.faces.attributes.gender.value;
            }
            // else {
            //     Data.gender = "Data Unavailable";
            // }
            if (response.faces.attributes.ethnicity != "null") {
               Data.ethnicity = response.faces.attributes.ethnicity.value;
            }
            // else {
            //     Data.ethnicity = "Data Unavailable";
            // }

            if (response.faces.attributes.age != "null" ) {
                 Data.age = response.faces.attributes.age.value;
            }
            // else {
            //     Data.age = "Data Unavailable";
            // }
                }

                catch(f){
                Data.age = "Data Unavailable";
                Data.smile = "Data Unavailable";
                Data.gender = "Data Unavailable";
                Data.ethnicity = "Data Unavailable";
                }

            $('#testresult').append('<div class="col-sm-4"><div class="thumbnail fpimg"><img class="eimg" src="'+ currentImg + '"><div class="caption">' + '<p>Age : <span class="age-data">'+ Data.age + '</span></p>' + '<p> Gender: ' + Data.gender + '<p> Smile : ' +'<span class="data-smile">' + Data.smile + '</span></p>' + '<p> Location : '+'<span class="data-location">'+ $("#location").val() +'</span>' + '</div></div></div>');

            //'<div class="thumbnail col-md-6 fpimg"> <img class="filtered-img" src=' + currentImg + '>' + '<div class="caption">' + '<p>' + "Age: " + Data.age + '</p>' + '<p>' + "Gender: " + Data.gender + '</p>' + '<p>' + "Smile: " + Data.smile + '</p>' + '</div></div>'
        }
    }





};

// functionIsRunning = false;



// });

        // $('testresult').append('<div class="thumbnail col-md-9"> <img style="width: 100%;" src=' + currentImg + '>' + '<div class="caption">' + '<p>' + "Age: " + response.faces[0].attributes.age.value + '</p>' + '<p>' + "Gender: " + response.faces[0].attributes.gender.value + '</p>' + '<p>' + "Smile: " + response.faces[0].attributes.smile.value + '</p>' + '</div></div>');


        // $('#testresult').append('<div class="caption">' + '<p>' + "Age: " + response.faces[0].attributes.age.value + '</p>' + '<p>' + "Gender: " + response.faces[0].attributes.gender.value + '</p>' + '<p>' + "Smile: " + response.faces[0].attributes.smile.value + '</p>');
        // $('#testresult').append ('<p>'+ "Age: "+ response.faces[0].attributes.age.value  +'</p>');
        //  $('#testresult').append ('<p>'+ "Gender: "+ response.faces[0].attributes.gender.value  +'</p>');
        //   $('#testresult').append ('<p>'+ "Smile: "+ response.faces[0].attributes.smile.value  +'</p>');

        // $('#testresult2').append ('<p>'+json.attributes[0].smile.value +'</p>');
        // $('#testresult2').html ('<p>'+ attributes.smile[0].value +'</p>');