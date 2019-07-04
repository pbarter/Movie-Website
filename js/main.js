/// I placed most of my "getElementbyId's here as well as the links I need for the homepage"
const contHtml = document.getElementById(`container`);
const contPagehtml = document.getElementById(`containerpage`);
const indexPage = document.getElementById(`index`)
const apiLink = "https://api.themoviedb.org/3/movie/now_playing?api_key=078aa8b41bce47faf75fe45521581f05&language=en-US&page=1";
const imgLink = "https://image.tmdb.org/t/p/w500"
const xhr = new XMLHttpRequest();
const singleViewClick = document.getElementById(`singleview-cont`)
const requestAPI1 = document.getElementById(`one`);
const requestAPI2 = document.getElementById(`two`);
const requestAPI3 = document.getElementById(`three`);
const requestAPI4 = document.getElementById(`four`);
const requestAPI5 = document.getElementById(`five`);
////////////////////////////////////////////////////////////////

// Request API Function for Homepage
const requestAPI = () => {
    xhr.open("GET", apiLink);
    xhr.send();
    xhr.addEventListener("readystatechange", printContent)
    
};
// Print the contents of the API
const printContent = () => {
    if (xhr.readyState==4) {
        const jsonData=JSON.parse(xhr.responseText);
        for (let i = 0; i < jsonData.results.length; i++) {
        contHtml.innerHTML+=
        `<li class="movie-container" id="getid">
            <div class="movie-img"  onclick="singlePageLoad()"><img src="${imgLink}/${jsonData.results[i].poster_path}"  data-id="${jsonData.results[i].id}"></div>
            <h2 class="movie-title">${jsonData.results[i].title}</h2>
            <div class="synopsis"><p><span class="font-weight-bold">Synopsis:</span> ${jsonData.results[i].overview.substring(0, 150) + `...`}</p></div>
            <div class="release"><p>${jsonData.results[i].release_date}</p></div>
            <div class="score"><p>${jsonData.results[i].vote_average}</p></div>
        </li>`;

        }
    }
    window.scrollTo(0,0);
}

////////////////////////////////////////////////////////////////

// When the website loads, load the requestAPI function (default to first page for latest movies)
window.onload = requestAPI();
////////////////////////////////////////////////////////////////

/// Pages when "clicked" will request the API for that specific page and load it onto the DOM
requestAPI1.addEventListener("click", ev => {
    contHtml.innerHTML = ``;
    xhr.open("GET","https://api.themoviedb.org/3/movie/now_playing?api_key=078aa8b41bce47faf75fe45521581f05&language=en-US&page=1");
    xhr.send();
    xhr.addEventListener("readystatechange", printContent)
})

requestAPI2.addEventListener("click", ev => {
    contHtml.innerHTML = ``;
    xhr.open("GET","https://api.themoviedb.org/3/movie/now_playing?api_key=078aa8b41bce47faf75fe45521581f05&language=en-US&page=2");
    xhr.send();
    xhr.addEventListener("readystatechange", printContent)
})

requestAPI3.addEventListener("click", ev => {
    contHtml.innerHTML = ``;
    xhr.open("GET","https://api.themoviedb.org/3/movie/now_playing?api_key=078aa8b41bce47faf75fe45521581f05&language=en-US&page=3");
    xhr.send();
    xhr.addEventListener("readystatechange", printContent)
})

requestAPI4.addEventListener("click", ev => {
    contHtml.innerHTML = ``;
    xhr.open("GET","https://api.themoviedb.org/3/movie/now_playing?api_key=078aa8b41bce47faf75fe45521581f05&language=en-US&page=4");
    xhr.send();
    xhr.addEventListener("readystatechange", printContent)
})

requestAPI5.addEventListener("click", ev => {
    contHtml.innerHTML = ``;
    xhr.open("GET","https://api.themoviedb.org/3/movie/now_playing?api_key=078aa8b41bce47faf75fe45521581f05&language=en-US&page=5");
    xhr.send();
    xhr.addEventListener("readystatechange", printContent)
})
////////////////////////////////////////////////////////////////

/// When the poster is clicked, this will target the ID then send an XMLHTTPRequest for the single movie and then output the data I have requested
singlePageLoad = () => {
    console.log(event.target.dataset.id)
    let singleMovieId = event.target.dataset.id;
    let xhrSingle = new XMLHttpRequest();
    let singleAPI = `https://api.themoviedb.org/3/movie/${singleMovieId}?api_key=078aa8b41bce47faf75fe45521581f05&language=en-US`;
    xhrSingle.open ("GET", singleAPI);
    xhrSingle.send();
    xhrSingle.addEventListener("readystatechange", ()=>{
        if (xhrSingle.readyState == 4 ) {
            const jsonSingleData=JSON.parse(xhrSingle.responseText);
            singleViewClick.style.display= `grid`;
            singleViewClick.innerHTML = `<div id="movie-cont">
            <div class="details-bg">
            <div class="poster-img"><img src="${imgLink}/${jsonSingleData.poster_path}"></div>
            <div class="content">
            <div class="closepage"><i class="far fa-times-circle" onclick="closeSingle()"></i></div>
            <div class="title-date-cont"><div class="title-date"><h1 class="movie-title">${jsonSingleData.title}</h1> <div class="date"><p>Release date: ${jsonSingleData.release_date}</p></div></div></div> 
            <div class="overviewfull"><p>${jsonSingleData.overview}</p></div>
            <div class="trailer" id="tra"><a onclick="getTrailer()" data-id="${jsonSingleData.id}">Trailer <i class="far fa-play-circle"></i></a></div>
            <div class="ratingsingle"><p>Rating: ${jsonSingleData.vote_average}</p></div>
            <div class="review-button"><a  data-id="${jsonSingleData.id}" onclick="getReview()">Read user reviews</a></div>
            </div>
            </div>
            <div class="review-cont">
            <div id="rev"><div class="rev-head"><h1>Reviews:</h1><p class="closepage" onclick="closeReview()"><i class="far fa-times-circle"></i></p></div></div>
            </div>
            </div>`
        }
    });
    
}
/// To close the single display
closeSingle = () => {
    singleViewClick.style.display= `none`;
}

/* A request to get the trailer for the specific movie.. I matched the ID like I did with the single page in order to get the trailer.. Also made
a object that will just link youtube to the first trailer in the list of videos from the video API for the specific movie (first set of data is usually 
the trailer so I told it to get that) */
getTrailer = () => {
    console.log(event.target.dataset.id)
    let xhrTrailer = new XMLHttpRequest();
    let movieId = event.target.dataset.id;
    let trailerID = document.getElementById(`tra`);
    let getTrailer = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=078aa8b41bce47faf75fe45521581f05&language=en-US`
    xhrTrailer.open("GET", getTrailer)
    xhrTrailer.send();
    xhrTrailer.addEventListener("readystatechange", ()=>{
        if (xhrTrailer.readyState == 4 ) {
            const jsonTrailer = JSON.parse(xhrTrailer.responseText);
            console.log(jsonTrailer.results[0].key)
            let theTrailer = jsonTrailer.results[0].key;
            location.href = (`https://www.youtube.com/watch?v=` + theTrailer);
        }
    })
};

// Function to get the reviews for the movie.. This also opens another expanded box with the list of reviews.  
getReview = () => {
    let movieId = event.target.dataset.id;
    let xhrReview = new XMLHttpRequest();
    let reviewId = document.getElementById(`rev`);
    xhrReview.open ("GET", `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=078aa8b41bce47faf75fe45521581f05&language=en-US`)
    xhrReview.send();
    xhrReview.addEventListener("readystatechange", () => {
        if (xhrReview.readyState == 4) {
            const jsonRev = JSON.parse (xhrReview.responseText);
            for (let i = 0; i < jsonRev.results.length; i++) {
            reviewId.style.display = `block`;
            reviewId.innerHTML += `
            <div class ="review-contents">
                <h3>Reviewer: ${jsonRev.results[i].author}</h3>
                <p>${jsonRev.results[i].content}</p>
            </div>`       
            }
        }
    });

}
/// To close the review
closeReview = (outside) => {
    let reviewId = document.getElementById(`rev`);
    reviewId.style.display = `none`;
    reviewId.innerHTML = `<div class="rev-head"><h1>Reviews:</h1><p class="closepage" onclick="closeReview()"><i class="far fa-times-circle"></i></p></div>`;
} 
