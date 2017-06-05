
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
        opennow: true,
        rankby: distance,
        radius: idistance,
        types: [typeSelected]
      };
      var service=new google.maps.places.PlacesService(document.createElement('div'));

        service.nearbySearch(request,callback);



      function callback(results,status){

                GetData(results);

      }

      function GetData(data){
        var aData=data;
        var i;
        var j=0;



        var tm=250;
        for (i = 0; i < aData.length; i++) {
          setTimeout(function () {

            FindLocation(aData[j],j);
            j++
          },tm);
          tm+=300;
        }
      }

      var cDiv="content-div1";
      var cPhoto="";


      function FindLocation(place,j){
        if(j%2==0){
          cDiv="content-div1";
        }
        else{
          cDiv="content-div2";
        }

          var rq={
            placeId:place.place_id
          };
          service.getDetails(rq, function(details, status){
            console.log(details);
            if('undefined'=== typeof details.photos){
              cPhoto="img/qm.png";
            }
            else {
              cPhoto=details.photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200});


            }
            $('#content').append(
              "<div class='"+cDiv+"'>"+
              "<table>"+
                "<tr>"+
                  "<td style='width: 25%;'>"+
                  "<a href='"+details.website+"' target='_blank'><img class='content-image' src="+"'"+cPhoto+"'"+"height='100' width='100'>"+"</a>"+
                  "</td>"+
                  "<td style='width: 75%;'>"+"<h2 class='content-text'>"+details.name+"</h2>"+
                  "<a href='"+details.url+"' target='_blank'>"+
                  "<img class='content-icon' src='img/loc-icon.png' style='width:24px;'>"+
                  "</a>"+

                  "</td>"+
                "</tr>"+
              "</table>"+
              "</div>"

            );
          });
      }

    }
