console.log("Here we start!")

let cityNameEl = document.querySelector("#cityName");
let tempEl = document.querySelector("#temperature");
let humidityEl = document.querySelector("#humidity");
let windSpeedEl = document.querySelector("#windspeed");
let uvIndexEl = document.querySelector("#uvIndex");

let cityInput = $("#cityInput").val();
let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=3e36a353a513c2197f90f8494af1060a"

//let cityInput = document.querySelector("#cityInput");

let getWeatherBtn = document.querySelector("#getWeatherBtn");

$(document).ready(function(){
  $("#getWeatherBtn").click(function(){
    console.log("The city is " + cityInput);

  });
});









