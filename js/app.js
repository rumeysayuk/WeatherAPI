async function getWeather(cityName) {
    let apiKey = "5e298e728c465424ef66f0b04798fcab";
    let api = "https://api.openweathermap.org/data/2.5/weather";
    let url = api + "?q=" + cityName + "&appid=" + apiKey + "&units=metric&lang=tr";
    let weather;
    await fetch(url)
        .then(res => res.json())
        .then(data => {

             let temp = data.main.temp;
            console.log(temp)
            //let temp2=data.list[1].main.temp;
            weather = temp;
        })
    return weather;
}

/* SVG Türkiye haritasi js */

function svgturkiyeharitasi() {
    const element = document.querySelector('#svg-turkiye-haritasi');
    const info = document.querySelector('.il-isimleri');

    element.addEventListener(
        'click',
        function (event) {
            if (event.target.tagName === 'path' && event.target.parentNode.id !== 'guney-kibris') {
                info.innerHTML = [
                    '<div id="temp" class="temp">',
                    event.target.parentNode.getAttribute('data-iladi'),
                    '</div>'
                ].join('');
                const cityName = event.target.parentNode.getAttribute('data-iladi');
                 getWeather(cityName).then((temp)=>{
                     const show=document.querySelector("#temp")
                     show.innerHTML+=" "+temp+" °C";
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
