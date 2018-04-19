$(document).ready(function () {
    //$(small).hide();
    if (navigator.geolocation) {
        var currentPosition = '';
        navigator.geolocation.getCurrentPosition(function (position) {
            currentPosition = position;

            var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude

            $.getJSON(url, function (data) {
                //console.log(data);

                var data = JSON.stringify(data);
                var json = JSON.parse(data);

                console.log(data);
                console.log(json);

                var country = json.name;
                console.log(country);
            });
        });
    }
});

