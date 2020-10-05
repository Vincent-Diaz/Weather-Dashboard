$(document).ready(function (){
    var APIKey = "75fe2766124f299a48145ea5552ff987";
    var searchArray = [];

     $("#searchBtn").on("click", searchCity)
    //     event.preventDefault();
    //     var cityInput = $("#city-input").val().trim();

    //     var textInput = $(this).sibilings("#city-name").val();
    //     searchArray.push(textInput);
    //     localStorage.setItem(textInput, JSON.stringify(searchArray))
    //     
    // searchCity(cityInput);
    

    moment().format('L');

   function searchCity() {
        var city = $("#city-input").val();

        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
        
        var queryURL2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response){
            console.log(response);
            //$("#current").empty();
            var mainDate = moment().format('L');

            var displayDate = $("<h3>");
            $("#city-name").empty();
            $("#city-name").append(displayDate.text("(" + mainDate + ")"));

            var cityName = $("<h3>").text(response.name);
            $("#city-name").prepend(cityName);
            console.log(response.name);
            $("#temp").text("Temperature: " + response.main.temp + "F");
            console.log(response.main.temp);
            $("#humidity").text("Humidity: " + response.main.humidity + "%");
            $("#wind-speed").text("Wind-Speed: " + response.wind.speed + "MPH");
            
            var weatherIcon = $("<img>");
            weatherIcon.attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

            $("#current-icon").empty();
            $("#current-icon").append(weatherIcon);

            var lat = JSON.stringify(response.coord.lat);
            var lon = JSON.stringify(response.coord.lon);


            var queryURL3 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

            $.ajax({
                url: queryURL3,
                method: "GET"
            }).then(function (response){
                console.log(response)

                var uvDisplay = $("<button>");
                uvDisplay.addClass("btn btn-danger");

                $("#UV-index").text("UV Index: ");
                $("#UV-index").append(uvDisplay.text(response.value));
            })
        })

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response){
            var results = response.list
            $("#forecast-cards").empty();

            for (var i = 0; i < results.length; i +=8) {

            }
        })
    }
})
