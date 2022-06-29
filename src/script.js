'use strict';

//Homework Week 4

// ⏰Feature #1
// In your project, display the current date and time using JavaScript: Tuesday 16:00
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

// 🕵️‍♀️Feature #2
// Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
function formatDate(timestamp) {
	const today = new Date(timestamp);
	const hours = today.getHours();
	const minutes = today.getMinutes();
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

const buttonSearch = document.querySelector('#search');
buttonSearch.addEventListener('click', () => {
	event.preventDefault();
	const cityId = document.querySelector('#city');
	const formId = document.querySelector('#form');
	// cityId.innerHTML = formId.value;

	const keyApi = config.OPEN_WEATHER_API_KEY;
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${(cityId.innerHTML =
		formId.value)}&units=metric`;
	function showTemp(response) {
		console.log(response.data);
		const tempEle = document.querySelector('#temperature');
		tempEle.innerHTML = `${Math.round(response.data.main.temp)}`;

		const descriptionEle = document.querySelector('#description');
		descriptionEle.innerHTML = response.data.weather[0].description;

		const humidEle = document.querySelector('#humid');
		humidEle.innerHTML = response.data.main.humidity;

		const windEle = document.querySelector('#wind');
		windEle.innerHTML = `${Math.round(response.data.wind.speed)}`;

		const dateElement = document.querySelector('#date');
		dateElement.innerHTML = formatDate(response.data.dt * 1000);
	}
	axios.get(`${apiUrl}&appid=${keyApi}`).then(showTemp);
});

const buttonCurr = document.querySelector('#current-location');
buttonCurr.addEventListener('click', (event) => {
	function showTempPos(position) {
		const lat = Math.round(position.coords.latitude);
		const lon = Math.round(position.coords.longitude);
		console.log(lat, lon);
		const keyApi = config.OPEN_WEATHER_API_KEY;
		const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${keyApi}`;

		axios.get(apiUrl).then(displayTempPos);
	}

	event.preventDefault();
	navigator.geolocation.getCurrentPosition(showTempPos);

	function displayTempPos(response) {
		console.log(response.data);
		const realTimeTemp = `${Math.round(response.data.main.temp)}`;
		console.log(realTimeTemp);

		const cityId = document.querySelector('#city');
		cityId.innerHTML = response.data.name;

		const tempEle = document.querySelector('#temperature');
		tempEle.innerHTML = `${realTimeTemp}`;

		const descriptionEle = document.querySelector('#description');
		descriptionEle.innerHTML = response.data.weather[0].description;

		const humidEle = document.querySelector('#humid');
		humidEle.innerHTML = response.data.main.humidity;

		const windEle = document.querySelector('#wind');
		windEle.innerHTML = `${Math.round(response.data.wind.speed)}`;

		const dateElement = document.querySelector('#date');
		dateElement.innerHTML = formatDate(response.data.dt * 1000);
	}
});

// 🙀Bonus Feature
// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
// const celsiusEl = document.querySelector('#celsius');
// const fahrenheitEl = document.querySelector('#fahrenheit');

// celsiusEl.addEventListener('click', () => {
// 	event.preventDefault();
// 	const temp = document.querySelector('#temperature');
// 	temp.innerHTML = 26;
// });

// fahrenheitEl.addEventListener('click', () => {
// 	event.preventDefault();
// 	const temp = document.querySelector('#temperature');
// 	temp.innerHTML = 79;
// });
