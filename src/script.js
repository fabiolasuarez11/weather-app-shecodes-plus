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
const buttonEl = document.querySelector('#search');
buttonEl.addEventListener('click', () => {
	event.preventDefault();
	const cityId = document.querySelector('#city');
	const formId = document.querySelector('#form');
	// cityId.innerHTML = formId.value;

	// Homework Week 5

	const keyApi = config.OPEN_WEATHER_API_KEY;
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${(cityId.innerHTML =
		formId.value)}&units=metric`;
	function showTemp(response) {
		const tempEle = document.querySelector('#temperature');
		tempEle.innerHTML = `${Math.round(response.data.main.temp)}`;
	}
	axios.get(`${apiUrl}&appid=${keyApi}`).then(showTemp);
});

// Homework Week 5 Bonus
// NOTE: This part of code works perfectly when I test my code from VS code in the Browser Google Chrome. However, for some reason I don't understand this doesn't work in CodeSandbox.

const buttonCurr = document.querySelector('#current-location');
buttonCurr.addEventListener('click', () => {
	function showTempPos(position) {
		const lat = Math.round(position.coords.latitude);
		const lon = Math.round(position.coords.longitude);
		console.log(lat, lon);
		const keyApi = config.OPEN_WEATHER_API_KEY;
		const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${keyApi}`;

		axios.get(apiUrl).then(displayTempPos);
	}

	navigator.geolocation.getCurrentPosition(showTempPos);

	function displayTempPos(response) {
		const realTimeTemp = Math.round(response.data.main.temp);
		console.log(realTimeTemp);

		const cityId = document.querySelector('#city');
		cityId.innerHTML = response.data.name;

		const tempEle = document.querySelector('#temperature');
		tempEle.innerHTML = `${realTimeTemp}`;
	}
	displayTempPos();
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
