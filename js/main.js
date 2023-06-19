$(document).ready(function () {

    $("#searchForm").on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        // console.log(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    axios.get('http://www.omdbapi.com/?apikey=adbf0b5&s=' + searchText)
        .then((resp) => {
            // console.log(resp);
            let movies = resp.data.Search;
            // console.log(movies); //give us array of all movies
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                <div class="col-md-3">
                    <div class="well text-center">
                       <img src="${movie.Poster}">
                       <div class="hidden">
                         <h5>${movie.Title}</h5>  
                         <a class="btn btn-primary" onClick="movieSelected('${movie.imdbID}')" href="#">Movie Details</a>
                       </div>
                    </div>
                </div>
                `
            })

            $('#movies').html(output);

        })
        .catch((err) => {
            console.log(err);
        })
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = '/src/movieInfo.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com/?apikey=adbf0b5&i=' + movieId)
        .then((resp) => {
            console.log(resp);
            let movie = resp.data;

            let output = `
            <div class="row">
               <div class="col-md-4">
                 <img src="${movie.Poster}" class="thumbnail">
               </div>
               <div class="col-md-8">
                  <h2>${movie.Title}</h2>
                  <ul class="list-group">
                     <li class="list-group-item"><strong>Genre: </strong> ${movie.Genre}</li>
                     <li class="list-group-item"><strong>Released: </strong> ${movie.Released}</li>
                     <li class="list-group-item"><strong>Rated: </strong> ${movie.Rated}</li>
                     <li class="list-group-item"><strong>IMDB Rating: </strong> ${movie.imdbRating}</li>
                     <li class="list-group-item"><strong>Director: </strong> ${movie.Director}</li>
                     <li class="list-group-item"><strong>Writer: </strong> ${movie.Writer}</li>
                     <li class="list-group-item"><strong>Actors: </strong> ${movie.Actors}</li>
                     <li class="list-group-item"><strong>Awards: </strong> ${movie.Awards}</li>
                  </ul>
               </div>
            </div>
            <div class="row mt-5">
               <div class="well">
                  <h3>Plot</h3>
                  ${movie.Plot}
                  <hr>
                  <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                  <a href="/index.html" class="btn btn-default">Go Back to Search</a>
               </div>
            </div>
            `
            $("#movie").html(output);
        })
        .catch(err => {
            console.log(err);
        })
}