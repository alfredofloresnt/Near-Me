
var web1;
 var istars=0;
 var idistance=0;

  function updateRatingValue(val){
    document.getElementById('stars').innerHTML=val;
    istars=parseInt(val);

  }

  function updateDistanceValue(val){
    document.getElementById('distance').innerHTML=val;
    idistance=parseInt(val)*1000;
  }


  function getLocation() {
console.log("test1");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(myFunction);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

}


    function myFunction(position){
       console.log("test2");
      $("#content").remove();
      $("body").append("<div class='' id='content'></div>");
      var loc=new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      console.log(position.coords.latitude+" , "+ position.coords.longitude);
      var typeSelected=$('input[name="type"]:checked').val();
      var request={
        location: loc,
        radius: idistance,
        types: [typeSelected]
      };
      var service=new google.maps.places.PlacesService(document.createElement('div'));
      service.nearbySearch(request,callback);

      function callback(results,status){
        for (var i = 0; i < results.length; i++) {
          var colorClass;
          if (i%2==0){
            colorClass="content-div1";
          }
          else{
            colorClass="content-div2";
          }

          if (results[i].rating>=istars){
            var rq={
            placeId:results[i].place_id
            };

            service.getDetails(rq, callback1);

            function callback1(place, status) {
              console.log(place);





              $('#content').append(
                "<div class='col-xs-12 "+ colorClass+"'>"+
                "<a href='"+place.website+"'><img class='content-image' src="+"'"+place.photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200})+"'"+"height='100' width='100'> </a>"+
                "<h2 class='content-text'>"+place.name+"</h2>"+
                "<br>"+
                "</div>"
              );
            }
          }
        }
      }
    }
