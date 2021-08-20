function getWeather() {
    const location = document.getElementById("location");
    const weather = document.getElementById("weather");
    let api = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey = "5e298e728c465424ef66f0b04798fcab";

    navigator.geolocation.getCurrentPosition(resolve, reject);

    function resolve(position) {
        latitude = position.coords.latitude;    //enlem
        longitude = position.coords.longitude;   //boylam

        let url = api + "?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric";

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                let temp = data.main.temp;
                 weather.innerHTML = `
                   <div class="card" style="width: 22rem;">
                   <img class="card-img-top" src="weather.gif" alt="Weather">
                        <div class="card-body">
    <h5 class="card-title ">${temp} ° C</h5>
    <p class="card-text">${data.name}</p>
    <p class="card-text text">${data.weather[0].main}</p>
    <a href="#" class="btn btn-primary" onclick="window.location.reload(false)">Hava Durumune yenile</a>
  </div>
</div>
       `});
       }

    function reject() {
        location.innerHTML = "Konumunuz alınamadı";
    }
}
getWeather();

