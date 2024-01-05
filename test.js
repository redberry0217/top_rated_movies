document.addEventListener('click', function (event) {
    const clickedElement = event.target;
    
const parentElements = document.querySelectorAll('.movieCard1, .movieCard2');
parentElements.forEach(parentElement => {
    const childElements = parentElement.children;
    childElements.forEach(childElement => {
        const movieId = movieCard.dataset.movieId;
        alert(`영화 ID: ${movieId}`);
    });
});