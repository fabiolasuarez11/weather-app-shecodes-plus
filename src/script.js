'use strict';

// Displaying current date
const today = new Date();
console.log(today);

const header = document.querySelector('#header-first');

const yearMonths = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

header.innerHTML = `${formatDate(today)}, ${
	yearMonths[today.getMonth()]
} ${today.getDate()}, ${today.getFullYear()}`;

// Formatting weather last updated day and time
function formatDate(timestamp) {
	const today = new Date(timestamp);
	let hours = today.getHours();
	hours < 10 ? (hours = `0${hours}`) : hours;
	let minutes = today.getMinutes();
	minutes < 10 ? (minutes = `0${minutes}`) : minutes;
	const weekDays = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	const day = weekDays[today.getDay()];

	return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
	const today = new Date(timestamp * 1000);
	const day = today.getDay();
	let weekDays = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	return weekDays[day];
}

// Search engine
const buttonSearch = document.querySelector('#search');
buttonSearch.addEventListener('click', (event) => {
	event.preventDefault();

	const cityId = document.querySelector('#city');
	const formId = document.querySelector('#form');
	const keyApi = config.OPEN_WEATHER_API_KEY;
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${(cityId.innerHTML =
		formId.value)}&units=imperial`;

	function showTemp(response) {
		console.log(response.data);
		const tempEle = document.querySelector('#temperature');
		const dateElement = document.querySelector('#date');
		const descriptionEle = document.querySelector('#description');
		const iconEle = document.querySelector('#icon');
		const maxTempEle = document.querySelector('#max');
		const minTempEle = document.querySelector('#min');
		const humidEle = document.querySelector('#humid');
		const windEle = document.querySelector('#wind');
		const forecastCity = document.querySelector('#forecast-city');

		tempEle.innerHTML = Math.round(response.data.main.temp);
		dateElement.innerHTML = formatDate(response.data.dt * 1000);
		descriptionEle.innerHTML = response.data.weather[0].description;
		iconEle.setAttribute(
			'src',
			`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
		);
		iconEle.setAttribute('alt', response.data.weather[0].description);
		maxTempEle.innerHTML = Math.round(response.data.main.temp_max);
		minTempEle.innerHTML = Math.round(response.data.main.temp_min);
		humidEle.innerHTML = response.data.main.humidity;
		windEle.innerHTML = Math.round(response.data.wind.speed);
		forecastCity.innerHTML = `${formId.value} Daily Forecast`;

		getForecast(response.data.coord);
	}

	axios.get(`${apiUrl}&appid=${keyApi}`).then(showTemp);
});

//Current location
const buttonCurr = document.querySelector('#current-location');
buttonCurr.addEventListener('click', (event) => {
	event.preventDefault();

	function showTempPos(position) {
		const lat = position.coords.latitude;
		const lon = position.coords.longitude;
		const keyApi = config.OPEN_WEATHER_API_KEY;
		const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${keyApi}`;

		axios.get(apiUrl).then(displayTempPos);
	}

	navigator.geolocation.getCurrentPosition(showTempPos);

	function displayTempPos(response) {
		console.log(response.data);
		const realTimeTemp = Math.round(response.data.main.temp);
		const cityId = document.querySelector('#city');
		const tempEle = document.querySelector('#temperature');
		const dateElement = document.querySelector('#date');
		const descriptionEle = document.querySelector('#description');
		const iconEle = document.querySelector('#icon');
		const maxTempEle = document.querySelector('#max');
		const minTempEle = document.querySelector('#min');
		const humidEle = document.querySelector('#humid');
		const windEle = document.querySelector('#wind');
		const forecastCity = document.querySelector('#forecast-city');

		cityId.innerHTML = response.data.name;
		tempEle.innerHTML = realTimeTemp;
		dateElement.innerHTML = formatDate(response.data.dt * 1000);
		descriptionEle.innerHTML = response.data.weather[0].description;
		iconEle.setAttribute(
			'src',
			`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
		);
		iconEle.setAttribute('alt', response.data.weather[0].description);
		maxTempEle.innerHTML = Math.round(response.data.main.temp_max);
		minTempEle.innerHTML = Math.round(response.data.main.temp_min);
		humidEle.innerHTML = response.data.main.humidity;
		windEle.innerHTML = Math.round(response.data.wind.speed);
		forecastCity.innerHTML = `${response.data.name} Daily Forecast`;

		getForecast(response.data.coord);
	}
});

// Forecast
function getForecast(coords) {
	console.log(coords);
	const keyApi = config.OPEN_WEATHER_API_KEY;
	const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${keyApi}&units=imperial`;
	console.log(apiUrl);
	axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
	const dailyForecast = response.data.daily;
	// console.log(dailyForecast);
	const forecastEle = document.querySelector('#forecast');
	// const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

	let forecastHTML = `<div class="row">`;
	dailyForecast.forEach((forecastDay, index) => {
		if (index > 0 && index < 7) {
			forecastHTML =
				forecastHTML +
				`
      <div class="col-2 m-0 p-0"> 
			<div class="text-center week-temp">${formatDay(forecastDay.dt)}</div>
			<div class="align-self-center">
      <img
          src="https://openweathermap.org/img/wn/${
						forecastDay.weather[0].icon
					}@2x.png"
          alt="Weather condition"
          width="80"
        />
			</div>
      <div class="text-center week-temp">
        <span class="m-0 w-100 text-center" id="max-temp">${Math.round(
					forecastDay.temp.max
				)}</span>° - <span class="m-0 ms-1" id="min-temp">${Math.round(
					forecastDay.temp.min
				)}</span>°
      </div>
      <div class="m-0 p-0 text-center week-temp"><span class="m-0 p-0" id="humid-day">${
				forecastDay.humidity
			}</span>%<i class="fa-solid fa-droplet m-1 p-1"></i></div>
			</div>
				`;
		}
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastEle.innerHTML = forecastHTML;
	// console.log(forecastHTML);
}
