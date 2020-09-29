// Setup the form
const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2')

// Setup the submit 
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the location and get it's forecast
    const location = searchElement.value;
    getForecast(location)
})

const getForecast = (address) => {

    // clear any values from the previous search
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
    response.json().then((data) => {
        if (data.error) {
             messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    })
})
}