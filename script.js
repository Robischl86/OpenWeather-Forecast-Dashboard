$(document).ready(function () {

    //DISPLAYING CURRENT DATE
    $("#currentDate").text(moment().format("MMM Do YYYY"));

    let enterInput = document.getElementById("cityInput");
    cityArray = [];

    init();

    /// RENDER CITY BUTTONS    
    function renderCities() {
        cityInput.innerHTML = "";
        for (let i = 0; i < cityArray.length; i++) {
            let storedCityName = cityArray[i];
            let renderedCityButton = $("<button type='button' class='btn btn-info btn-lg' style ='margin: 10px 10px 0px 0px'>").text(storedCityName);
            $("#cityHolder").append(renderedCityButton);

            //GET WEATHER FROM CITY BUTTON
            $(renderedCityButton).on("click", function () {
                storedCitySearch = $(renderedCityButton).text();
                $("#cityInput").val(storedCitySearch);
                getWeather();
            });
        }
    }

    function init() {
        let storedCities = JSON.parse(localStorage.getItem("cityArray"))
        if (storedCities !== null) {
            cityArray = storedCities;
        }
        if (cityArray.length > 0) {
            renderCities();
        }

    }

    // Store cities in local storage
    function storeCities() {
        localStorage.setItem("cityArray", JSON.stringify(cityArray));
    }

    //GET WEATHER FROM TEXT FIELD AND "Find City" BUTTON
    $("#getWeatherBtn").on("click", function () {
        getWeather();
        getWeather();
    });

    //GET WEATHER FROM TEXT FIELD AND ENTER KEY
    $("#cityInput").keypress(function (e) {
        let key = e.which;
        if (key == 13) {
            getWeather();
            getWeather();
        }
    });

    //GET WEATHER FUNCTION
    function getWeather() {
        event.preventDefault();
        let cityInput = $("#cityInput").val();
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=3e36a353a513c2197f90f8494af1060a";
        forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=3e36a353a513c2197f90f8494af1060a"

        //AJAX    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            //CITY NAME
            $("#cityName").text(response.name)
            if (cityArray.length < 1) {
                cityArray.push(response.name)
                let firstCityButton = $("<button type='button' class='btn btn-info btn-lg' style ='margin: 10px 10px 0px 0px'>").text(response.name);
                $("#cityHolder").append(firstCityButton);

                //GET WEATHER FROM CITY BUTTON
                $(firstCityButton).on("click", function () {
                    firstCityButtonName = $(firstCityButton).text();
                    $("#cityInput").val(firstCityButtonName);
                    getWeather();
                });
            }

            //CURRENT WEATHER ICON
            let weatherIcon = response.weather[0].icon;
            $("#currentWeatherImg").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
            $("#currentWeatherImg").css({ "background-color": "deepskyblue", "border-style": "solid", "border-color": "black", "border-radius": "10px", "margin": "10px 10px 20px 0px" })

            //CURRENT TEMPERATURE
            let temp = response.main.temp;
            let F = Math.round((temp - 273.15) * 1.80 + 32);
            $("#temperature").text("Temperature: " + F + "℉");

            //CURRENT HUMIDITY
            let humidity = response.main.humidity;
            $("#humidity").text("Humidity: " + humidity + "%");

            //CURRENT WIND SPEED
            let wind = response.wind.speed;
            $("#windspeed").text("Wind Speed: " + wind + " MPH");

            //UV INDEX
            let lon = response.coord.lon;
            let lat = response.coord.lat;
            let uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=3e36a353a513c2197f90f8494af1060a&lat=" + lat + "&lon=" + lon;
            $("#uvIndex").text("UV Index: ");

            //CURRENT UV AMOUNT
            $.ajax({
                url: uvIndexURL,
                method: "GET"
            }).then(function (response) {

                let uvAmount = response.value;
                $("#uvAmount").text(uvAmount)

                // Cities with a UV Amount above 6 will have a red background and white font-color
                if (uvAmount > 6) {
                    $("#uvAmount").css({ "background-color": "red", "font-weight": "bold", "color": "white", "font-size": "large" })
                }
                else {
                    $("#uvAmount").css({ "background-color": "", "font-weight": "bold", "color": "black" })
                }
            });

            //FORECAST API
            $.ajax({
                url: forecastURL,
                method: "GET"
            }).then(function (response) {

                $("#forecastHolder").empty();
                for (let i = 0; i < 40; i++) {

                    //Creating Div to store the forecast information
                    let forecastDiv = $("<div class='forecastDiv'>");

                    //If-statement so that the function only shows the forecast conditions for 3pm each day.
                    if (moment(response.list[i].dt_txt).format('LTS') == "3:00:00 PM") {

                        // FORECAST DATE
                        let forecastDate = moment(response.list[i].dt_txt).format('l');
                        let forecastHour = moment(response.list[i].dt_txt).format('LTS');
                        let ForecastHeader = $("<h4>").text(forecastDate);
                        forecastDiv.append(ForecastHeader);

                        // FORECAST ICON
                        let forecastImageID = response.list[i].weather[0].icon;
                        let forecastIconURL = "https://openweathermap.org/img/wn/" + forecastImageID + "@2x.png";
                        let forecastImageIcon = $("<img>").attr("src", forecastIconURL);
                        forecastDiv.append(forecastImageIcon);

                        // FORECAST TEMP
                        let forecastKelvin = response.list[i].main.temp;
                        let FF = Math.round((forecastKelvin - 273.15) * 1.80 + 32);
                        let forecastTemp = $("<h5>").text("Temp: " + FF + "℉")
                        forecastDiv.append(forecastTemp);

                        // FORECAST HUMIDITY
                        let FH = response.list[i].main.humidity;
                        let forecastHumidity = $("<h5>").text("Humidity: " + FH + "%")
                        forecastDiv.append(forecastHumidity);
                        $("#forecastHolder").append(forecastDiv);
                    };
                };
            });

            $("#cityInput").val('');

            //ADDING NEW BUTTON TO #cityHolder WHILE PREVENTING DUPLICATES
            for (i = 0; i < cityArray.length; i++) {

                if (cityArray.includes(response.name) === false) {
                    cityArray.push(response.name)
                    storeCities();
                    let cityButton = $("<button type='button' class='btn btn-info btn-lg' style ='margin: 10px 10px 0px 0px'>").text(response.name);
                    $("#cityHolder").append(cityButton);

                    //GET WEATHER FROM CITY BUTTON
                    $(cityButton).on("click", function () {
                        cityButtonName = $(cityButton).text();
                        $("#cityInput").val(cityButtonName);
                        getWeather();
                    });
                };
            };
        });
    };
});