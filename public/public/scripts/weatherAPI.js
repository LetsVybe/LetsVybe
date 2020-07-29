// Uses the live location (provided address if live location cannot be accessed) to retrieve the weather information.


// Convert the callback based function, getCurrPosition, to promise based.
function getCurrentPosition(options={timeout: 5000}) {
	return new Promise ((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(resolve, reject, options);
		}
	})
}

// Get the zipCode from below components with order as their priority:
// 1. Current Position
// 2. User Database
async function getZipCode(user) {
	return new Promise((resolve, reject) => {
		getCurrentPosition()
			.then(position => {
				// resolve the zipCode
				resolve(position.address.postalCode);
			})
			.catch(error => {
				console.log('Position not found. Trying from the database now...');
				if (user.zipCode){
					resolve(user.zipCode);
				} else {
					reject(error);
				}

			})
	});
}

async function getWeatherInformation(user) {
	return new Promise((resolve, reject) => {
		// This promise should resolve the weather information.
		getZipCode(user)
			.then(zipCode => {
				resolve(getCurrentWeather(zipCode));
			})
			.catch(error => {
				reject(error);
			})
	});
}

// Get the current weather based on the zipCode.
function getCurrentWeather(zipCode) {
	let req = new XMLHttpRequest();
	let url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',us&appid=2531760be0f40683d19d66f5898a1e00';
	req.open('GET', url, false);
	req.send();
	let res = JSON.parse(req.response);
	return {
		city: res.name,
		temp: res.main.temp,
		tempMin: res.main.temp_min,
		tempMax: res.main.temp_max,
		clouds: res.clouds.all
	}
}