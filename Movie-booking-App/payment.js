document.querySelector('#back-button').addEventListener('click', () => {
    location.href = './index.html'
})
let form = document.querySelector('form');
let inputList = document.querySelectorAll('.input');

form.addEventListener('submit', (event) => {
    event.preventDefault()

    if (inputList[0].value != '' && inputList[1].value != '' && inputList[2].value != '' && inputList[3].value != '' && inputList[4].value != '' && inputList[5].value != '' && inputList[6].value != '') {
        location.href = './thankyou/thankyou.html'
    }
    else {
        alert('all field are required');
    }
})

let movieName = document.querySelector('#movie-name');
let moviePrice = document.querySelector('#movie-price');
let movieDetails = JSON.parse(localStorage.getItem('movieKey'));
movieName.innerHTML = movieDetails.name;
moviePrice.innerHTML = movieDetails.price;

document.querySelector('#tax').innerHTML = movieDetails.price * (0.0175).toFixed(2);
document.querySelector('#sub-total').innerHTML = Number(movieDetails.price) + movieDetails.price * (0.0175).toFixed(2);

let ticketNumber = document.querySelector('#ticket-number');
ticketNumber.addEventListener('input', () => {
    let numberofTicket = ticketNumber.value;
    let taxValue = (numberofTicket * movieDetails.price) * (0.0175).toFixed(2);
    document.querySelector('#tax').innerHTML = taxValue;
    document.querySelector('#sub-total').innerHTML = ticketNumber.value * movieDetails.price + taxValue;
})

