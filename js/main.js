$(document).ready(function() {
  $(".small").hide();

  getWeather();

  function getWeather() {
    var locationApi = "https://ipinfo.io/json";

    $.getJSON(locationApi, function(locationData) {
      var locationAll = locationData.loc.split(",");
      var lat = Number(locationAll[0]);
      var lon = Number(locationAll[1]);
      // console.log(locationData);
      // console.log(locationAll);
      console.log(lat);
      console.log(lon);

      var region = locationData.city;
      // console.log(region);
      var country = locationData.country;
      //console.log(country);

      var newWeatherApi =
        "https://cors.5apps.com/?uri=http://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=metric" +
        "&APPID=4b0eb1f18e238279f8d2f3a95669b602";

      console.log(newWeatherApi);

      $.getJSON(newWeatherApi, function(data) {
        var data = JSON.stringify(data);
        var json = JSON.parse(data);
        //console.log(data);
        console.log(json);

        var wind = json.wind.speed;
        //console.log(wind);
        var pressure = json.main.pressure;
        //console.log(pressure);

        //temp to 1 decimal place
        var tempCel = Math.round(json.main.temp * 10) / 10;
        //convert Celsius to Fahrenheit and round to 1 decimal place
        var tempFah = Math.round((tempCel * 1.8 + 32) * 10) / 10;
        // console.log(tempCel);
        // console.log(tempFah);

        var humidity = json.main.humidity;
        //console.log(humidity);
        var cloud = json.clouds.all;
        // console.log(cloud);

        $("#locationData").html(region + ", " + country);

        $(".small").show();

        if (tempCel <= 10) {
          $(".boxData").css({
            backgroundImage:
              "url(https://github.com/char502/Weather-App-FCC/blob/master/images/nature-3279071_960_720.jpg?raw=true)"
          });
          $("#weatherStatement").html("<h1>It's a bit chilly today<hr></h1>");
        } else if (tempCel > 10 && tempCel <= 18) {
          $(".boxData").css({
            backgroundImage:
              "url(https://github.com/char502/Weather-App-FCC/blob/master/images/sunlight-2547619_960_720.jpg?raw=true)"
          });
          $("#weatherStatement").html("<h1>It's a mild day today<hr></h1>");
        } else if (tempCel > 18 && tempCel <= 28) {
          $(".boxData").css({
            backgroundImage:
              "url(https://github.com/char502/Weather-App-FCC/blob/master/images/nature-1071466_960_720.jpg?raw=true)"
          });
          $("#weatherStatement").html("<h1>A lovely warm day today<hr></h1>");
        } else {
          $(".boxData").css({
            backgroundImage:
              "url(https://github.com/char502/Weather-App-FCC/blob/master/images/desert-790640_960_720.jpg?raw=true)"
          });
          $("#weatherStatement").html(
            "<h1>It's a really hot day today<hr></h1>"
          );
        }

        // retrieve and show wind speed
        $("#data1").html("Wind Speed: " + wind + "m/s");
        // retrieve and show atmospheric pressure
        $("#data2").html("Pressure: " + pressure + "mb");

        $("#data3").html(tempCel + " &#8451");

        var yes = true;
        //toggle celsius to fahremheit on button click
        $("#convertTemp").on("click", function() {
          if (yes) {
            $("#data3").html(tempFah + " &#8457");
            $("#convertTemp").html("Convert to Celsius");
            $("#convertTemp").css({ outline: "none" });
            yes = false;
          } else {
            $("#data3").html(tempCel + " &#8451");
            $("#convertTemp").html("Convert to Fahrenheit");
            $("#convertTemp").css({ outline: "none" });
            yes = true;
          }
        });

        //cloud cover
        if (cloud <= 30) {
          $("#data4").html("Clear Skies");
        } else if (cloud >= 31 && cloud <= 60) {
          $("#data4").html("Cloudy");
        } else {
          $("#data4").html("Overcast");
        }

        // retrieve and show humidity
        $("#data5").html("Humidity: " + humidity + "%");
      });
    });
  }
});
