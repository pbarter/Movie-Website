const contHtml = document.getElementById(`container`);
const contPagehtml = document.getElementById(`containerpage`);

const apiLink = "https://api.themoviedb.org/3/movie/now_playing?api_key=078aa8b41bce47faf75fe45521581f05&language=en-US&page=1";
const imgLink = "https://image.tmdb.org/t/p/w500"
const xhr = new XMLHttpRequest();
const requestAPI1 = document.getElementById(`one`);
const requestAPI2 = document.getElementById(`two`);
const requestAPI3 = document.getElementById(`three`);
const requestAPI4 = document.getElementById(`four`);
const requestAPI5 = document.getElementById(`five`);

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
        `<li class="movie-container">
            <div class="movie-img"><img src="${imgLink}/${jsonData.results[i].poster_path}"></div>
            <h2 class="movie-title">${jsonData.results[i].title}</h2>
            <div class="synopsis"><p><span class="font-weight-bold">Synopsis:</span> ${jsonData.results[i].overview.substring(0, 150) + `...`}</p></div>
            <div class="release"><p>${jsonData.results[i].release_date}</p></div>
            <div class="score"><p>${jsonData.results[i].vote_average}</p></div>
        </li>`;
        }
    }
}

window.onload = requestAPI()

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