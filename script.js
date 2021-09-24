const API_KEY = "api_key=8106982f387ec7ab24657dfb49ed6396";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = "https://api.themoviedb.org/3/discover/movie?api_key=8106982f387ec7ab24657dfb49ed6396&sort_by=popularity.desc";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const searchURL = BASE_URL +"/search/movie?"+API_KEY;

getMovies(API_URL);

function getMovies(url){

           fetch(url)
            .then(res => res.json())
            .then(data =>{
                
                showMovies(data.results);
            })
               
}
    

function showMovies(data)  {
    main.innerHTML ="";

    data.forEach(movie => {
        const {title,poster_path,release_date,vote_average} = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie-card")
        movieEl.innerHTML = `
            <img src=${IMG_URL+poster_path} alt="image">
            <div class="movie-info">
                <h3>${title}</h3>
                <br>
                <span class=${getColor(vote_average)}>${vote_average}</span>
            </div>
            <div class="release-date">
               ${release_date.substring(0,4)}
            </div>
        
        `
        main.appendChild(movieEl);
    });
    
}


function getColor(a){

    if (a >= 8){
        return "green"
    }else if ( a >=5){
        return "orange"
    }else {
        return "red"
    }

}

form.addEventListener("submit" ,e => {
    e.preventDefault();

    const searchTerm = search.value;
    if(searchTerm){
        getMovies(searchURL+"&query="+searchTerm)
    }else {
        getMovies(API_URL);
    }
    
}) 