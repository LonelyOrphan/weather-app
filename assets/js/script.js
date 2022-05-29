const searchHistoryContainer = $("#cities-search-history");
// const recentSearches = readFromLocalStorage("recentSearches", []);
const recentSearches = ["London", "Berlin", "Tokyo"];

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

const renderSearches = () => {
  const searchList = $("#search-list");
  //get search results from localstorage

  if (recentSearches.length) {
    const createRecentCity = (city) => {
      return `<li class="my-list-item py-2 my-2" data-city="${city}">${city}</li>`;
    };
    const recentCities = recentSearches.map(createRecentCity).join("");
    console.log(recentCities);
    const ul = `<ul id="search-list" class="list-group">${recentCities}</ul>`;
    searchHistoryContainer.append(ul);
  } else {
    const alert = `<div class="alert alert-light" role="alert">
      You have no recent searches`;
    searchList.append(alert);
  }
};

// On click of Search, store city as a variable
$("#search-form").submit(function (e) {
  const city = $("#search-box").val();
  e.preventDefault();
  console.log(city);
  // Check it's a real city

  // Save to local storage
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
