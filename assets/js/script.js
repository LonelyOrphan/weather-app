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

const renderCurrentWeather = (city, data) => {
  console.log(data);
  // Update heading with city
  $("#city-heading").text(city);
  // Update current weather
  $("#current-weather").text(data.weather[0].main);
  // Update temp
  $("#current-temp").text(data.main.temp + " °F");
  // Update wind speed
  $("#current-wind-speed").text(data.wind.speed + " mph");
  // Update humidity
  $("#current-humidity").text(data.main.humidity + "%");
  // Update UV index
  $("#current-uv-index").text();
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

  console.log();
};

const displayForecast = () => {};

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
