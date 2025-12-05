async function getWeather() {
    const city = document.getElementById("city").value;
    const result = document.getElementById("result");

    if (city === "") {
        result.innerHTML = "Please enter a city name.";
        return;
    }

    try {
        // 1. Convert city name → latitude + longitude
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            result.innerHTML = "City not found!";
            return;
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // 2. Fetch actual weather data
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();

        const w = weatherData.current_weather;

        result.innerHTML = `
            <h3>${name}, ${country}</h3>
            <p>🌡 Temperature: ${w.temperature}°C</p>
            <p>🌬 Wind Speed: ${w.windspeed} km/h</p>
            <p>🧭 Wind Direction: ${w.winddirection}°</p>
            <p>⌚ Time: ${w.time}</p>
        `;
    } catch (error) {
        result.innerHTML = "Error fetching weather.";
        console.error(error);
    }
}
