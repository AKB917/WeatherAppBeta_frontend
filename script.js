// const URLBACKEND = "https://weather-app-beta-backend-iys9.vercel.app";
var URLBACKEND = "https://weatherappbeta-backend.onrender.com";
const OWM_ICON_PATH = "https://openweathermap.org/img/wn";

// Récupération du user
let user = null;
if (localStorage.getItem('user') && localStorage.getItem('user') !== 'undefined') {
	user = JSON.parse(localStorage.getItem('user'));
}

console.log("User:", user);

// Affichage "Bonjour"
if (user) {
	const userButton = document.querySelector('#userButton');
	if (user.name && userButton) {
		userButton.innerHTML = `
			<p>Bonjour ${user.name}</p>
			<button id="logoutBtn">Se déconnecter</button>
		`;
		document.querySelector('#logoutBtn').addEventListener('click', () => {
			localStorage.removeItem('user');
			window.location.reload();
		});
	}
}

// Météo de la position géographique actuelle
navigator.geolocation.getCurrentPosition(position => {
	const { latitude, longitude } = position.coords;

	fetch(`${URLBACKEND}/weather/position`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ latitude, longitude }),
	})
		.then(res => res.json())
		.then(data => {
			if (data.result) {
				const city = data.weather;
				document.querySelector('#currentPos').innerHTML = `
					<div class="cityContainer">
						<p class="name">${city.cityName} (actuelle)</p>
						<p class="description">${city.description}</p>
<img class="weatherIcon" src="${city.icon ? `${OWM_ICON_PATH}/${city.icon}@2x.png` : 'images/default-icon.png'}" />
						<div class="temperature">
							<p class="tempMin">${city.tempMin}°C</p>
							<span>-</span>
							<p class="tempMax">${city.tempMax}°C</p>
						</div>
					</div>
				`;
			}
		});
});

// Charger les villes du user
window.addEventListener("DOMContentLoaded", () => {
	if (!user) return;

	fetch(`${URLBACKEND}/users/${user._id}/cities`)
		.then(response => response.json())
		.then(data => {console.log("Villes reçues :", data);
			if (data.weather && data.weather.length > 0) {
				data.weather.forEach(city => {console.log("Ville à afficher :", city);
					document.querySelector('#cityList').innerHTML += `
						<div class="cityContainer">
							<p class="name">${city.cityName}</p>
							<p class="description">${city.description}</p>
<img class="weatherIcon" src="${city.icon ? `${OWM_ICON_PATH}/${city.icon}@2x.png` : 'images/default-icon.png'}" />
							<div class="temperature">
								<p class="tempMin">${city.tempMin}°C</p>
								<span>-</span>
								<p class="tempMax">${city.tempMax}°C</p>
							</div>
							<button class="deleteCity" data-id="${city._id}">Delete</button>

						</div>`;
				});
				updateDeleteCityEventListener();
			}
		});
});

// Ajouter une ville
document.querySelector('#addCity').addEventListener('click', function () {
	if (!user) return alert("Connectez-vous d'abord !");
	const cityName = document.querySelector('#cityNameInput').value;

	fetch(`${URLBACKEND}/weather`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ cityName, userId: user._id }),
	}).then(response => response.json())
		.then(data => {
			if (data.result) {
				const city = data.weather;
				document.querySelector('#cityList').innerHTML += `
					<div class="cityContainer">
						<p class="name">${city.cityName}</p>
						<p class="description">${city.description}</p>
<img class="weatherIcon" src="${city.icon ? `${OWM_ICON_PATH}/${city.icon}@2x.png` : 'images/default-icon.png'}" />
						<div class="temperature">
							<p class="tempMin">${city.tempMin}°C</p>
							<span>-</span>
							<p class="tempMax">${city.tempMax}°C</p>
						</div>
						<button class="deleteCity" data-id="${city._id}">Delete</button>

					</div>`;
				updateDeleteCityEventListener();
				document.querySelector('#cityNameInput').value = '';
			} else {
				alert(data.error);
			}
		});
});

function updateDeleteCityEventListener() {
	document.querySelectorAll('.deleteCity').forEach(btn => {
	  btn.addEventListener('click', function () {
		const cityId = this.dataset.id;
  
		fetch(`${URLBACKEND}/weather/id/${cityId}`, { method: 'DELETE' })
		  .then(res => res.json())
		  .then(data => {
			if (data.result) {
			  this.parentNode.remove();
			} else {
			  console.error("Erreur suppression :", data.error);
			}
		  });
	  });
	});
  }
  
