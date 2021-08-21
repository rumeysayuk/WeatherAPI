// function getWeather() {
//     const location = document.getElementById("location");
//     const weather = document.getElementById("weather");
//     let api = "https://api.openweathermap.org/data/2.5/weather";
//     let apiKey = "5e298e728c465424ef66f0b04798fcab";
//     let api2 = "https://api.openweathermap.org/data/2.5/weather";
//
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//
//     function resolve(position) {
//         latitude = position.coords.latitude;    //enlem
//         longitude = position.coords.longitude;   //boylam
//
//         let url = api + "?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric";
//
//
//         fetch(url)
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data);
//                 let temp = data.main.feels_like;
//                 weather.innerHTML = `
//                    <div class="card" style="width: 22rem;">
//                    <img class="card-img-top" src="weather.gif" alt="Weather">
//                         <div class="card-body">
//     <h5 class="card-title ">${temp} ° C</h5>
//     <p class="card-text">${data.name}</p>
//     <p class="card-text text">${data.weather[0].main}</p>
//     <a href="#" class="btn btn-primary" onclick="window.location.reload(false)">Hava Durumune yenile</a>
//   </div>
// </div>
//        `
//             });
//     }
//
//     function reject() {
//         location.innerHTML = "Konumunuz alınamadı";
//     }
// }
//getWeather();
function getWeather(cityName) {
    const show = document.querySelector("#loc")
    let apiKey = "5e298e728c465424ef66f0b04798fcab";
    let api2 = "https://api.openweathermap.org/data/2.5/weather";
    let url = api2 + "?q=" + cityName + "&appid=" + apiKey + "&units=metric&lang=tr";

    fetch(url)
        .then(res => res.json())
        .then(data => {
           //console.log(data)
            let temp = data.main.temp;
            let name =data.name;
           // console.log(temp + " °C")
            show.innerHTML = `${name} : ${temp} °C`
            return temp;
        })

}

/* SVG Türkiye haritasi js */

function svgturkiyeharitasi() {
    const element = document.querySelector('#svg-turkiye-haritasi');
    const info = document.querySelector('.il-isimleri');

    element.addEventListener(
        'mouseover',
        function (event) {
            if (event.target.tagName === 'path' && event.target.parentNode.id !== 'guney-kibris') {
                info.innerHTML = [
                    '<div>',
                    event.target.parentNode.getAttribute('data-iladi'),
                    '</div>'
                ].join('');
                const cityName = event.target.parentNode.getAttribute('data-iladi');
                getWeather(cityName)
            }
        }
    );

    element.addEventListener(
        'mousemove',
        function (event) {
            info.style.top = event.pageY + 25 + 'px';
            info.style.left = event.pageX + 'px';
        }
    );

    element.addEventListener(
        'mouseout',
        function (event) {
            info.innerHTML = '';
        }
    );

    element.addEventListener(
        'click',
        function (event) {
            if (event.target.tagName === 'path') {
                const parent = event.target.parentNode;
                const id = parent.getAttribute('id');

                if (
                    id === 'guney-kibris'
                ) {
                    return;
                }
                window.location.href = ('#' + id + '-' + parent.getAttribute('data-plakakodu'));
            }
        });
}
