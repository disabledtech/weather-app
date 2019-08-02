console.log('Client-side js loading');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

const getWeather = (location) => {
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                console.log(data)
                const generalMessage = `It is ${data.currentTemp > data.pastTemp ? "<span class='hotter'>hotter</span>" : "<span class='colder'>colder</span>"} than last year in ${data.location}.`
                const detailMessage = `Today it is <b>${data.currentTemp.toFixed(1)}</b>&deg;C. On this day last year it was <b>${data.pastTemp.toFixed(1)}</b>&deg;C.`
                messageOne.innerHTML = generalMessage
                messageTwo.innerHTML = detailMessage;
            }
        });
    });
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    getWeather(location)

});