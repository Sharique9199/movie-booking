let movieSearch = document.querySelector('#search-movie');
let movieListContainer = document.querySelector('#movie-list-container');
let serachButton = document.querySelector('#search-button');
let movieType=document.querySelector("#movie-type")

serachButton.addEventListener('click', () => {
    let inputVal = movieSearch.value;
    movieSearchHandler(inputVal);
    movieSearch.value = "";
   
});

function showPoup() {

    // movie list click fn

    let movieDivList = document.querySelectorAll('#movie-list-container> div');

    for (let i = 0; i < movieDivList.length; i++) {

        movieDivList[i].addEventListener('click', () => {

            let movieDetails = {
                title: '',
                rating: '',
                lang: '',
                desc: 'I am Sharique I am Sharique I am Sharique. I am Sharique. I am Sharique. I am Sharique. I am Sharique',
                img: '',
            }
            movieDetails.title = movieDivList[i].lastElementChild.firstElementChild.innerHTML;
            movieDetails.rating = movieDivList[i].lastElementChild.lastElementChild.lastElementChild.innerHTML;
            movieDetails.lang = movieDivList[i].lastElementChild.lastElementChild.firstElementChild.innerHTML;
            movieDetails.img = movieDivList[i].firstElementChild.firstElementChild.src;
            popupData(movieDetails);
            document.querySelector("#popup-wraper").style.display = 'block';
            document.querySelector("#bg-dark").style.display = 'block';
        })


    }
}

async function movieSearchHandler(input) {
    if (!input) {
        let res = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=6cb527f85c30a93b6c4a5ba1bc882cb2&language=en-US&page=1');
        let data = await res.json();
        appendData(data.results);
    }

    else if (input) {
        let res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=6cb527f85c30a93b6c4a5ba1bc882cb2&query=${input}&language=en-US&page=1&include_adult=false`);
        let data = await res.json();
        console.log(data.results);
        appendData(data.results);
    }

    showPoup();

}

async function fatchSelectedMovie(data) {
    let res = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=6cb527f85c30a93b6c4a5ba1bc882cb2&language=en-US&page=1');
    let myData = await res.json();
    let filteredMovieList = myData.results.filter((movie) => {
        for (let x of movie.genre_ids) {
            if (x == data) {
                return true;
            }
        }
    })
    console.log(filteredMovieList);
    appendData(filteredMovieList);
}

movieSearchHandler();

function appendData(data) {
    movieListContainer.innerHTML = "";
    data.map((movie) => {
        let div = document.createElement('div');
        let movieContent = `<div class="image-div">
            <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.backdrop_path ? movie.backdrop_path : '/3s9O5af2xWKWR5JzP2iJZpZeQQg.jpg'}"
                alt="">
        </div>
        <div class="movie-details-class">
            <h3>${movie.original_title}</h3>
            <div>
                <p>${movie.original_language}</p>
                <p>${movie.vote_average.toFixed(1)}</p>
            </div>
        </div>`;
        // div.classList.add(movie.overview);
        div.innerHTML = movieContent;

        movieListContainer.append(div);
    })
}

async function fatchGenre() {
    let response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=6cb527f85c30a93b6c4a5ba1bc882cb2&language=en-US');

    let getData = await response.json();

    appendSideBar(getData.genres);

    let genreList = document.querySelectorAll('.genreList');
    for (let i = 0; i < genreList.length; i++) {
        genreList[i].addEventListener('click', () => {
            fatchSelectedMovie(genreList[i].id);
        })
    }

}

fatchGenre()

function appendSideBar(data) {
    let genreContent = document.querySelector('#genre-content');
    data.map((data) => {
        let p = document.createElement('p');
        p.innerHTML = data.name;
        p.id = data.id;
        p.className = 'genreList';
        genreContent.append(p);
    })

}

function popupData(data) {
    // console.log(data);
    document.querySelector('#popup-wraper').innerHTML = '';
    let div = document.createElement('div');
    let xyz = `
    <h4 id="close-popup"><i class="fa-solid fa-xmark"></i></h4>

    <div id="popup-img-section">
        <img src=${data.img} alt="">
    </div>
    <div id="popup-imgDetails-section">
        <h1>${data.title}</h1>
        <h3><i class="fa-solid fa-star"></i>${data.rating}/10</h3>
        <p>${data.lang}</p>
        <p>125 minutes . Action</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, sit. Nisi, alias quod!
            Officiis
            doloribus dolor in facere quod laborum consectetur natus, et officia sequi amet ipsa est neque
            aliquid
            saepe sit,</p>
        <p><span>&#8377;</span>${Math.floor(Math.random() * 50) + 250}</p>
        <button id="bookBtn">Book Tickets</button>
    </div>
    `;
    div.innerHTML = xyz;
    div.id = 'popup'
    document.querySelector('#popup-wraper').append(div);

    document.querySelector('#close-popup').addEventListener('click', () => {
        document.querySelector("#popup-wraper").style.display = 'none';
        document.querySelector("#bg-dark").style.display = 'none';
    })

    document.querySelector('#bookBtn').addEventListener('click', () => {
        location.href = './payment.html'
    })
}

