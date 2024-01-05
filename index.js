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
        <div class="movieCard1">
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
        <div class="movieCard2">
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" class="otherMoviesPic"
                width="200">
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
    })
    .catch(err => console.error(err));

/** 검색 기능 */
function searchMovies() {
    const searchInput = document.getElementById('searchInput').value;

    // 검색어가 없으면 작업하지 않음
    if (!searchInput) {
        alert("검색어를 입력해주세요.");
        return;
    }

    const searchOptions = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWRkOTRjMWNmYjUyMTNmNjdjYzkxMjIyZmRhYWFkNSIsInN1YiI6IjY1OTRlZjY2YTY5OGNmNDcwYjQzYTBkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XVvW0B-gX4TtHKElUH2MocBwa-NNmKOE4pRMLKAjbqs'
        }
    };
    fetch(`https://api.themoviedb.org/3/search/movie/top_rated?query=${encodeURIComponent(searchInput)}&language=en-US&page=1`, searchOptions)
        .then(response => response.json())
        .then(data => {
            const searchResults = document.getElementById('searchResults');

            // 이전 검색 결과 초기화
            top3Movies.innerHTML = '';
            otherMovies.innerHTML = '';
            searchResults.innerHTML = '';

            // 검색 결과를 화면에 표시
            data.results.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.innerHTML = `
                <div class="movieCard2">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" class="otherMoviesPic"
                    width="200">
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
                searchResults.appendChild(movieDiv);
            });
        })
        .catch(err => console.error(err));
}

document.getElementById('searchBtn').addEventListener('click', searchMovies);