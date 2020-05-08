# OpenWeather-Forecast-Dashboard
I started this assignment by filling out the HTML and determining the id's attached to specific tags.
I then created the getWeather() function, which would be triggered by the #getWeatherBtn.

Within the getWeather() function, I set up my JQUERY use the input from the #cityInput form to do city-searches using the OpenWeather API for the current weather. The response items would then be made into the text value for their respective <p> tags (temperature, humidity, ie.).
  
Another AJAX method was created to pull the same information from the five-day forecast. Using the Moment.JS library, I created a for-loop that result in only the forecast information being displayed for 3pm of each day. Each of the called items from the response would then be added to a div containing the forecast information, which would then be appended to a containing div.

Finally, I created for loop within the getWeather() function that would create a button with the name of each city that was searched, and then append it to the #cityHolder div. To prevent duplicate buttons from being formed, I set the for loop to push the name of the search city into an array, and then created an if statement that would compare the name of a searched city against the objects already present in the array.
