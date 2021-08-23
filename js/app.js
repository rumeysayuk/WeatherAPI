async function getWeather(cityName) {
    //  let apiKey = "5e298e728c465424ef66f0b04798fcab";
    //  let api = "https://api.openweathermap.org/data/2.5/weather";
    // let url = api + "?q=" + cityName + "&appid=" + apiKey + "&units=metric&lang=tr";
    let apiKey2 = "ac36f8aa20344bf8adb80910212308";
    let api2 = "https://api.worldweatheronline.com/premium/v1/weather.ashx";
    let url2 = api2 + "?key=" + apiKey2 + "&q=" + cityName + "&format=json&num_of_days=5&lang=tr";
    let weather;
    await fetch(url2)
        .then(res => res.json())
        .then(data => {

            let temp2 = data.data.weather[0].hourly[3].tempC;
            // let temp = data.main.temp;
            //let temp2=data.list[1].main.temp;
            weather = temp2;
        })

    return weather;
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
                    '<div id="special" class="special">',
                    event.target.parentNode.getAttribute('data-iladi'),
                    '</div>'
                ].join('');
                const cityName = event.target.parentNode.getAttribute('id');
                getWeather(cityName).then((city_weather) => {
                    const show = document.querySelector("#special")
                    show.innerHTML += " " + city_weather + " °C";
                })
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
