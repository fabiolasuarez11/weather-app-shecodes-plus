'use strict';

// Displaying current date
const today = new Date();
console.log(today);

const header = document.querySelector('#header-first');

const weekDays = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

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

header.innerHTML = `${
	weekDays[today.getDay()]
} ${today.getHours()}:${today.getMinutes()}, ${
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
	let weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
		formId.value)}&units=metric`;

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
		const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${keyApi}`;

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
	}
});

// Display celsius or fahrenheit
const celsiusEl = document.querySelector('#celsius');
const fahrenheitEl = document.querySelector('#fahrenheit');

celsiusEl.addEventListener('click', (event) => {
	event.preventDefault();
	const cityId = document.querySelector('#city');
	const formId = document.querySelector('#form');
	const keyApi = config.OPEN_WEATHER_API_KEY;
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${(cityId.innerHTML =
		formId.value)}&units=metric`;

	function showCelsiusTemp(response) {
		console.log(response.data);
		const temp = document.querySelector('#temperature');
		temp.innerHTML = Math.round(response.data.main.temp);
	}
	axios.get(`${apiUrl}&appid=${keyApi}`).then(showCelsiusTemp);
});

fahrenheitEl.addEventListener('click', (event) => {
	event.preventDefault();
	const cityId = document.querySelector('#city');
	const formId = document.querySelector('#form');
	const keyApi = config.OPEN_WEATHER_API_KEY;
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${(cityId.innerHTML =
		formId.value)}&units=metric`;

	function showFahrenheitTemp(response) {
		console.log(response.data);
		const temp = document.querySelector('#temperature');
		temp.innerHTML = Math.round((response.data.main.temp * 9) / 5 + 32);
	}
	axios.get(`${apiUrl}&appid=${keyApi}`).then(showFahrenheitTemp);
});
