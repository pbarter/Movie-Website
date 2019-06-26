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
//Hero page Poster API

const heroPageBg = document.getElementById(`hero`);
const requestImg = () => {
    xhr.open ("GET", apiLink);
    xhr.send();
    xhr.addEventListener("readystatechange", printImg)
};

const printImg = () => {
    if (xhr.readyState==4) {
        const jsonData=JSON.parse(xhr.responseText);
        heroPageBg.innerHTML +=`
        <div class="background-img"><img src="${imgLink}/${jsonData.results[0].poster_path}" alt="latest movie poster"></div>
        <div class="background-img"><img src="${imgLink}/${jsonData.results[1].poster_path}" alt="latest movie poster"></div>
        <div class="background-img"><img src="${imgLink}/${jsonData.results[2].poster_path}" alt="latest movie poster"></div>
        <div class="background-img"><img src="${imgLink}/${jsonData.results[3].poster_path}" alt="latest movie poster"></div>
        <div class="background-img"><img src="${imgLink}/${jsonData.results[4].poster_path}" alt="latest movie poster"></div>`  
    }
}

requestImg();
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
            <div class="movie-img"  onclick="posterimg()"><img src="${imgLink}/${jsonData.results[i].poster_path}"  data-id="${jsonData.results[i].id}"></div>
            <h2 class="movie-title">${jsonData.results[i].title}</h2>
            <div class="synopsis"><p><span class="font-weight-bold">Synopsis:</span> ${jsonData.results[i].overview.substring(0, 150) + `...`}</p></div>
            <div class="release"><p>${jsonData.results[i].release_date}</p></div>
            <div class="score"><p>${jsonData.results[i].vote_average}</p></div>
        </li>`;

        }

    }
}

// When the website loads, load the requestAPI function (default to first page for latest movies)
window.onload = requestAPI()

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
/////END


/*
const getSingleMovie = () => {
    xhr.open ("GET", singleLink)
    xhr.send();
    xhr.addEventListener("readystatechange", displaySingle)
}

   const displaySingle = () => {
    let singleMovieId = event.target.dataset.id;
    let singleLink = `https://api.themoviedb.org/3/movie/${singleMovieId}?api_key=078aa8b41bce47faf75fe45521581f05&language=en-US`
    const singleViewClick = document.getElementById(`singleview-cont`)
    console.log(singleMovieId)
    if (singleMovieId) {
        const jsonSingleData=JSON.parse(xhr.responseText);
        singleViewClick.style.display = `block`;
        singleViewClick.innerHTML = `<div id="dis">${jsonSingleData.overview}</div>`
        console.log(singleLink)

    }
}


contHtml.addEventListener("click", displaySingle)
*/

posterimg = () => {
    console.log(event.target.dataset.id)
    let singleViewClick = document.getElementById(`singleview-cont`)
    let singleMovieId = event.target.dataset.id;
    let xhrSingle = new XMLHttpRequest();
    let singleAPI = `https://api.themoviedb.org/3/movie/${singleMovieId}?api_key=078aa8b41bce47faf75fe45521581f05&language=en-US`;
    xhrSingle.open ("GET", singleAPI);
    xhrSingle.send();
    xhrSingle.addEventListener("readystatechange", ()=>{
        if (xhrSingle.readyState == 4 ) {
            const jsonSingleData=JSON.parse(xhrSingle.responseText);
            singleViewClick.style.display= `inline-block`;
            singleViewClick.innerHTML = `<div id="movie-cont"><div class="poster-img"><img src="${imgLink}/${jsonSingleData.poster_path}"></div>
            <div class="details-bg">
            <h1 class="movie-title">${jsonSingleData.title}</h1> <p>Release date: ${jsonSingleData.release_date}</p> 
            <p>${jsonSingleData.overview}</p><p>${jsonSingleData.vote_average}</p></div>
            </div>`
        }
    });
}

