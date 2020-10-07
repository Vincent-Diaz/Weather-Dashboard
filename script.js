$(document).ready(function () {
    var APIKey = "75fe2766124f299a48145ea5552ff987";
    //var searchArray = [];
    var searchArray = JSON.parse(localStorage.getItem("city")) || [];
    if (searchArray.length > 0) {
        searchCity(searchArray[0]);
        renderSearchHistory();
    }
    var city;

    $("#searchBtn").on("click", function (event) {
        event.preventDefault();
        city = $("#city-input").val();
        //var textInput = $(this).parent("#city-input").val();
        searchArray.unshift(city);
        console.log(searchArray);
        //searchArray.push(textInput);
        localStorage.setItem("city", JSON.stringify(searchArray))

        //$("#historyList").append(searchArray);

        searchCity(city);
        renderSearchHistory();

    });

    $("#historyList").on("click", ".btn", function (event) {
        event.preventDefault();
        city = $(this).text();

        searchCity(city);

    })




    //moment().format('L');

    function searchCity(city) {
        // var city = $("#city-input").val();

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

        var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" +  APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
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
            weatherIcon.attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

            $("#city-name").append(weatherIcon);
            //$("#current-icon").empty();
            //$("#current-icon").append(weatherIcon);


            var lat = JSON.stringify(response.coord.lat);
            var lon = JSON.stringify(response.coord.lon);


            var queryURL3 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

            $.ajax({
                url: queryURL3,
                method: "GET"
            }).then(function (response) {
                console.log(response)

                var uvDisplay = $("<button>");
                uvDisplay.addClass("btn btn-light");

                $("#UV-index").text("UV Index: ");
                $("#UV-index").append(uvDisplay.text(response.value));

                if (response.value < 3) {
                    $('.btn-light').css('background-color', 'green');
                } else if (response.value < 6) {
                    $('.btn-light').css('background-color', 'yellow');
                } else if (response.value < 8) {
                    $('.btn-light').css('background-color', 'orange');
                } else if (response.value < 11) {
                    $('.btn-light').css('background-color', 'red');
                } else {
                    $('.btn-light').css('background-color', 'purple');
                }
            })

            

            //var lat = JSON.stringify(response.coord.lat);
            //var lon = JSON.stringify(response.coord.lon);

            //var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;

            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                var results = response.list
                console.log(results);
                $("#forecast-cards").empty();

                //var curDay = moment().format('L');

                for (var i = 0; i < 5; i++) {


                     var date = moment.unix(results[i].dt).format('LT');
                     console.log(date)
                    var setDate = moment().add(i + 1, 'days').format('L');
                    var temp = results[i].main.temp;
                    var hum = results[i].main.humidity;
                    var weather = "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png";

                    var elements = $(`
                <div class="card-forecast">
                    <div id="forecast" class="card-body border border-primary rounded">
                        <h5 class="card-title" id="forecast-date">${setDate}</h5>
                        <img src=${weather}>
                        <p class="text" id="forecast-temp">Temp: ${temp}</p>
                        <p class="text" id="forecast-humidity1">Humidity: ${hum}</p>
                    </div>
                </div>    
                `)

                    $("#forecast-cards").append(elements);


                }
            })
        })
    }

    function renderSearchHistory() {
        $("#historyList").empty();
        console.log(searchArray);
        //var searchArray = JSON.parse(localStorage.getItem("searchArray"));

        for (var i = 0; i < searchArray.length; i++) {
            var searchInput = $("<button>");
            searchInput.addClass("btn listBtn", "list-item-group");
            searchInput.attr("id", searchArray[i]);
            searchInput.text(searchArray[i]);
            $("#historyList").append(searchInput);
            console.log(searchArray[i]);
        }






    }
})
