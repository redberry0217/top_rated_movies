/**TMDB API */
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWRkOTRjMWNmYjUyMTNmNjdjYzkxMjIyZmRhYWFkNSIsInN1YiI6IjY1OTRlZjY2YTY5OGNmNDcwYjQzYTBkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XVvW0B-gX4TtHKElUH2MocBwa-NNmKOE4pRMLKAjbqs'
    }
};

/**TMDB 데이터 가져와서 카드 붙이기 */
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {
        const top3Movies = document.getElementById('top3Movies');
        const otherMovies = document.getElementById('otherMovies');

        data.results.forEach((movie, index) => {
            const movieDiv = document.createElement('div');

            if (index < 3) { /** 평점 상위 1~3위 영화 */
                movieDiv.innerHTML = `
        <div class="movieCard1" data-movie-id="${movie.id}">
            <div class="movieTitle1">
            ${movie.title}
            </div>
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" width="300">
            <div class="movieOverview1">
            ${movie.overview}
            </div>
            <div class="movieRate1">
                평점 ${movie.vote_average}
            </div>
        </div>
        `;
            } else { /** 그 외의 영화 */
                movieDiv.innerHTML = `
        <div class="movieCard2" data-movie-id="${movie.id}">
            <div class="movieImg">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="moviePoster" alt="${movie.title}" width="200">
            </div>
            <div class="movieCard2content">
            <div class="movieTitle2">
                ${movie.title}
                </div>
                <div class="movieOverview2">
                ${movie.overview}
                </div>
                <div class="movieRate2">
                평점 ${movie.vote_average}
                </div>
            </div>
        </div>
        `;
            }

            if (index < 3) {
                top3Movies.appendChild(movieDiv);
            } else {
                otherMovies.appendChild(movieDiv);
            }
        });
        /** 영화 카드 클릭 시 영화id 출력 */
        document.addEventListener('click', function (event) {
            const clickedElement = event.target;
            const parentElements = document.querySelectorAll('.movieCard1, .movieCard2');
        
            parentElements.forEach(parentElement => {
                if (clickedElement === parentElement || parentElement.contains(clickedElement)) {
                    const movieId = parentElement.dataset.movieId;
                    alert(`영화 ID: ${movieId}`);
                }
            });
        });
        
    })
    .catch(err => console.error(err));

/** 영화 검색하기 */
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');


function search() {
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(data => {
            const allMovies = data.results.map(movie => ({
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                voteRate: movie.vote_average,
            }));
            const keyword = searchInput.value.toLowerCase();
            const filteredMovies = allMovies.filter(movie =>
                movie.title.toLowerCase().includes(keyword)
            );

            top3Movies.innerHTML = '';
            otherMovies.innerHTML = '';
            searchResults.innerHTML = '';

            filteredMovies.forEach(movie => {
                const movieItem = document.createElement('div');
                movieItem.classList.add('movieItem');
                movieItem.innerHTML = `
                <div class="movieCard2" data-movie-id="${movie.id}">
                <div class="movieImg">
                    <img src="https://image.tmdb.org/t/p/w500/${movie.posterPath}" class="moviePoster" alt="${movie.title}" width="200">
                </div>
                <div class="movieCard2content">
                <div class="movieTitle2">
                    ${movie.title}
                    </div>
                    <div class="movieOverview2">
                    ${movie.overview}
                    </div>
                    <div class="movieRate2">
                    평점 ${movie.voteRate}
                    </div>
                </div>
            </div>
                `;
                searchResults.appendChild(movieItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

/** 검색창에 엔터키로 검색 실행 */
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        search();
    }
});

/** 검색 버튼 클릭 시 검색 실행 */
searchBtn.addEventListener('click', search);
