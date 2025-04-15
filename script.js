// ✅ script.js modifié avec géolocalisation actuelle
const OWM_ICON_PATH = 'images'; // dossier local des icônes

navigator.geolocation.getCurrentPosition(position => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=4810d2c7945fe82541e351ffa914d368`)
    .then(response => response.json())
    .then(current => {
      // 🔹 fetch des villes enregistrées ensuite
      fetch('http://localhost:3000/weather')
        .then(response => response.json())
        .then(data => {
          // ✅ Injecte la météo actuelle
          document.querySelector('#currentPos').innerHTML = `
				<div id="leftSide">
					<p id="currentPosName">${current.name}</p>
					<p id="currentPosDescription">${current.weather[0].description}</p>
					<div class="temperature">
						<p id="currentPosTempMin">${Math.round(current.main.temp_min)}°C</p>
						<span>-</span>
						<p id="currentPosTempMax">${Math.round(current.main.temp_max)}°C</p>
					</div>
				</div>
				<img id="currentPosIcon" src="${OWM_ICON_PATH}/${current.weather[0].main}.png"/>
			  `;

          // ✅ Injecte les villes enregistrées
          for (let i = 0; i < data.weather.length; i++) {
            document.querySelector('#cityList').innerHTML += `
					<div class="cityContainer">
						<p class="name">${data.weather[i].cityName}</p>
						<p class="description">${data.weather[i].description}</p>
						<img class="weatherIcon" src="${OWM_ICON_PATH}/${data.weather[i].main}.png"/>
						<div class="temperature">
							<p class="tempMin">${data.weather[i].tempMin}°C</p>
							<span>-</span>
							<p class="tempMax">${data.weather[i].tempMax}°C</p>
						</div>
						<button class="deleteCity" id="${data.weather[i].cityName}">Delete</button>
					</div>
				  `;
          }
          updateDeleteCityEventListener();
        });
    });
});

document.querySelector('#addCity').addEventListener('click', function () {
  const cityName = document.querySelector('#cityNameInput').value;

  fetch('http://localhost:3000/weather', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cityName }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        document.querySelector('#cityList').innerHTML += `
			<div class="cityContainer">
				<p class="name">${data.weather.cityName}</p>
				<p class="description">${data.weather.description}</p>
				<img class="weatherIcon" src="${OWM_ICON_PATH}/${data.weather.main}.png"/>
				<div class="temperature">
					<p class="tempMin">${data.weather.tempMin}°C</p>
					<span>-</span>
					<p class="tempMax">${data.weather.tempMax}°C</p>
				</div>
				<button class="deleteCity" id="${data.weather.cityName}">Delete</button>
			</div>`;
        updateDeleteCityEventListener();
        document.querySelector('#cityNameInput').value = '';
      }
    });
});

function updateDeleteCityEventListener() {
  for (let i = 0; i < document.querySelectorAll('.deleteCity').length; i++) {
    document.querySelectorAll('.deleteCity')[i].addEventListener('click', function () {
      fetch(`http://localhost:3000/weather/${this.id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
          if (data.result) {
            this.parentNode.remove();
          }
        });
    });
  }
}
