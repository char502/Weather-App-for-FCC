$(document).ready(function () {
    //$(small).hide();
    if (navigator.geolocation) {
        var currentPosition = '';
        navigator.geolocation.getCurrentPosition(function (position) {
            currentPosition = position;

            var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude

            $.getJSON(url, function (data) {
                console.log(data);
            });
        });
    }
});

