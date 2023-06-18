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
                         <a class="btn btn-primary" onClick="movieSelected('${movie.imbdID}') href="#">Movie Details</a>
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