 function getWeather() {
      const apiKey = 'YOUR_API_KEY_HERE';
      const cityInput = document.getElementById('cityInput').value;
      const weatherResult = document.getElementById('weatherResult');

      if (cityInput === '') {
        weatherResult.innerHTML = '<p>Please enter a city name.</p>';
        return;
      }

      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityInput)}&appid=${apiKey}&units=metric`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.cod === '404') {
            weatherResult.innerHTML = '<p>City not found. Please enter a valid city name.</p>';
            return;
          }

          const weatherDescription = data.weather[0].description;
          const temperature = data.main.temp;
          const humidity = data.main.humidity;
          const cityName = data.name;

          weatherResult.innerHTML = `
            <h2>Weather in ${cityName}</h2>
            <p>Description: ${weatherDescription}</p>
            <p>Temperature: ${temperature} °C</p>
            <p>Humidity: ${humidity} %</p>
          `;
        })
        .catch(error => {
          weatherResult.innerHTML = '<p>Something went wrong. Please try again later.</p>';
          console.error('Error fetching weather data:', error);
        });
    }
