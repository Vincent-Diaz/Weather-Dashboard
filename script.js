$(document).ready(function (){
    var APIKey = "75fe2766124f299a48145ea5552ff987";
    var searchArray = [];

    // $("#searchBtn").on("click", function(event){
    //     event.preventDefault();
    //     var cityInput = $("#city-input").val().trim();

    //     var textInput = $(this).sibilings("#city-name").val();
    //     searchArray.push(textInput);
    //     localStorage.setItem(textInput, JSON.stringify(searchArray))
    //     renderCurrentDay(cityInput);
    // });

    moment().format('L');

   function searchCity(city) {
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response){
            console.log(response);
            $("#current").empty();
            var mainDate = moment().format('L');

            $("#city-name").text(response.name);
            $("#current-date").text("(" + mainDate + ")");
            $("#temp").text("Temperature: " + response.main.temp + "F");
            $("#humidity").text("Humidity: " + response.main.humidity + "%");
            $("#wind-speed").text("Wind-Speed: " + response.wind.speed + "MPH");
            $("#city-name").text(response.name);
        })
    }
})
