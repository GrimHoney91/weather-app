const body = document.querySelector('body');
const search = document.querySelector('#search');
const temp = document.querySelector('#temp');
const city = document.querySelector('#city');
const icon = document.querySelector('#icon');

async function getData() {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${search.value}`, {mode: 'cors'});
        const data = await response.json();
        console.log(data);
        applyData(data);
    } catch (error) {
        console.error('Could not find City:', error);
    }
}

function applyData(obj) {
    temp.textContent = `${obj.current.temp_f}\u00B0F`;
    if (obj.location.country == 'United States of America') {
        city.textContent = `${obj.location.name}, ${obj.location.region}`;
    }
    else {
        city.textContent = `${obj.location.name}, ${obj.location.country}`;
    }
    let condition = obj.current.condition.text;
    condition = condition.toLowerCase();
    console.log(condition);
    if (condition.includes('sun')) {
        body.style.backgroundImage = 'url("images/backgrounds/sunny.jpg")';
        icon.src = 'images/icons/sun.png';
    }
    else if (condition.includes('cloud')) {
        body.style.backgroundImage = 'url("images/backgrounds/cloudy.jpg")';
        icon.src = 'images/icons/cloudy.png';
    }
    else if (condition.includes('rain')) {
        body.style.backgroundImage = 'url("images/backgrounds/rainy.jpg")';
        icon.src = 'images/icons/rain.png';
    }
    else if (condition.includes('snow')) {
        body.style.backgroundImage = 'url("images/backgrounds/snow.jpg")';
        icon.src = 'images/icons/snow.png';
    }
    else if (condition.includes('fog') || condition.includes('mist')) {
        body.style.backgroundImage = 'url("images/backgrounds/fog.jpg")';
        icon.src = 'images/icons/cloudy.png';
    }
    icon.style.display = 'inline';
}

search.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        getData();
        search.value = '';
    }
});
//3c8342690b2eb275aa786d4a2136813c