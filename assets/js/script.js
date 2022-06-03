const searchHistoryContainer = $("#cities-search-history");

// Get info from LS
const readFromLocalStorage = (key, defaultValue) => {
  const dataFromLS = localStorage.getItem(key);
  const parsedData = JSON.parse(dataFromLS);

  if (parsedData) {
    return parsedData;
  } else {
    return defaultValue;
  }
};

const recentSearches = readFromLocalStorage("recentSearches", []);
const searchForm = $("#search-form");

const saveToLocalStorage = (key, value) => {
  // convert value to string
  const valueAsString = JSON.stringify(value);
  localStorage.setItem(key, valueAsString);
};

const renderSearches = () => {
  if (recentSearches.length) {
    const createRecentCity = (city) => {
      return `<li class="my-list-item py-2 my-2" data-city="${city}">${city}</li>`;
    };
    const recentCities = recentSearches.map(createRecentCity).join("");
    const ul = `<ul id="search-list" class="list-group">${recentCities}</ul>`;
    console.log(ul);
    searchHistoryContainer.append(ul);
  } else {
    const alert = `<div id="empty-history-alert" class="alert alert-light text-center" role="alert">
      You have no recent searches`;
    searchHistoryContainer.append(alert);
  }
};

const addLatestSearch = () => {
  // get latest city from search history array
  const latestSearch = recentSearches[recentSearches.length - 1];
  const li = `<li class="my-list-item py-2 my-2" data-city="${latestSearch}">${latestSearch}</li>`;
  $("#search-list").append(li);
};

const weatherIcon = (condition) => {
  switch (condition) {
    case "Thunderstorm":
      return "http://openweathermap.org/img/wn/11d@2x.png";
    case "Drizzle":
      return "http://openweathermap.org/img/wn/09d@2x.png";
    case "Rain":
      return "http://openweathermap.org/img/wn/10d@2x.png";
    case "Snow":
      return "http://openweathermap.org/img/wn/13d@2x.png";
    case "Mist" || "Smoke" || "Haze" || "Dust":
      return "http://openweathermap.org/img/wn/50d@2x.png";
    case "Clear":
      return "http://openweathermap.org/img/wn/01d@2x.png";
    case "Clouds":
      return "http://openweathermap.org/img/wn/03d@2x.png";
    default:
      return "http://openweathermap.org/img/wn/10d@2x.png";
  }
};

const getUvi = (latLongObj) => {
  const lat = latLongObj.lat;
  const lon = latLongObj.lon;
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=e3be59c0a2f372f3c9629e35f0e1687f`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      $("#current-uv-index").text(data.current.uvi);
    });
};

const renderCurrentWeather = (city, data) => {
  console.log(data);
  // Update heading with city
  $("#city-heading").text(city);
  // Show current time
  $("#current-date-time").text(moment().format("Do MMM YYYY"));
  // Update current weather
  $("#current-weather").text(data.weather[0].main);
  // Update icon
  $("#current-weather-icon").attr("src", weatherIcon(data.weather[0].main));
  // Update temp
  $("#current-temp").text(data.main.temp + " °F");
  // Update wind speed
  $("#current-wind-speed").text(data.wind.speed + " mph");
  // Update humidity
  $("#current-humidity").text(data.main.humidity + "%");
  // Update UV index
  getUvi(data.coord);
  // Show info containers
  $("#current-weather-info").removeClass("display-switch");
};

const createForecast = (city, data) => {
  const forecastDay1 = {
    date: moment.unix(data.list[7].dt).format("Do MMM YYYY"),
    temp: data.list[7].main.temp,
    wind: data.list[7].wind.speed,
    humidity: data.list[7].main.humidity,
  };

  const forecastDay2 = {
    date: moment.unix(data.list[15].dt).format("Do MMM YYYY"),
    temp: data.list[15].main.temp,
    wind: data.list[15].wind.speed,
    humidity: data.list[15].main.humidity,
  };
  const forecastDay3 = {
    date: moment.unix(data.list[23].dt).format("Do MMM YYYY"),
    temp: data.list[23].main.temp,
    wind: data.list[23].wind.speed,
    humidity: data.list[23].main.humidity,
  };
  const forecastDay4 = {
    date: moment.unix(data.list[31].dt).format("Do MMM YYYY"),
    temp: data.list[31].main.temp,
    wind: data.list[31].wind.speed,
    humidity: data.list[31].main.humidity,
  };
  const forecastDay5 = {
    date: moment.unix(data.list[39].dt).format("Do MMM YYYY"),
    temp: data.list[39].main.temp,
    wind: data.list[39].wind.speed,
    humidity: data.list[39].main.humidity,
  };

  const forecastArr = [
    forecastDay1,
    forecastDay2,
    forecastDay3,
    forecastDay4,
    forecastDay5,
  ];

  displayForecast(forecastArr);
};

const displayForecast = (forecastArr) => {
  $("#forecast-date1").text(forecastArr[0].date);
  $("#forecast-temp1").text(forecastArr[0].temp + "°F");
  $("#forecast-wind1").text(forecastArr[0].wind + "mph");
  $("#forecast-humidity1").text(forecastArr[0].humidity + "%");

  $("#forecast-date2").text(forecastArr[1].date);
  $("#forecast-temp2").text(forecastArr[1].temp + "°F");
  $("#forecast-wind2").text(forecastArr[1].wind + "mph");
  $("#forecast-humidity2").text(forecastArr[1].humidity + "%");

  $("#forecast-date3").text(forecastArr[2].date);
  $("#forecast-temp3").text(forecastArr[2].temp + "°F");
  $("#forecast-wind3").text(forecastArr[2].wind + "mph");
  $("#forecast-humidity3").text(forecastArr[2].humidity + "%");

  $("#forecast-date4").text(forecastArr[3].date);
  $("#forecast-temp4").text(forecastArr[3].temp + "°F");
  $("#forecast-wind4").text(forecastArr[3].wind + "mph");
  $("#forecast-humidity4").text(forecastArr[3].humidity + "%");

  $("#forecast-date5").text(forecastArr[4].date);
  $("#forecast-temp5").text(forecastArr[4].temp + "°F");
  $("#forecast-wind5").text(forecastArr[4].wind + "mph");
  $("#forecast-humidity5").text(forecastArr[4].humidity + "%");

  $("#5-day-forecast").removeClass("display-switch");
};

const getCurrentDate = () => {};

// Call API for current weather data
const getCurrentWeather = (city) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e3be59c0a2f372f3c9629e35f0e1687f`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      renderCurrentWeather(city, data);
    });
};

const getForecast = (city) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e3be59c0a2f372f3c9629e35f0e1687f`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      createForecast(city, data);
    });
};

// On click of Search
searchForm.submit(function (e) {
  const city = $("#search-box").val();
  e.preventDefault();
  if (city) {
    console.log(city);
  }
  recentSearches.push(city);
  console.log(recentSearches);
  // Remove empty search alert
  $("#empty-history-alert").remove();
  // Save current search ty local storage
  saveToLocalStorage("recentSearches", recentSearches);
  addLatestSearch();
  getCurrentWeather(city);
  getForecast(city);
});

const searchHistoryClick = (event) => {
  const target = $(event.target);
  if (target.is("li")) {
    const cityName = target.attr("data-city");
    console.log(cityName);
  }
};

searchHistoryContainer.click(searchHistoryClick);

const onReady = () => {
  renderSearches();
};

$(document).ready(onReady);
