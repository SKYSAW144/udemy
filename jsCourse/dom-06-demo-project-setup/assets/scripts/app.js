// better performance than query selector by ID
const addMovieModal = document.getElementById('add-modal');

/**
 * Also need access to addMovieButton
 * risky way; what we want may not always be where we expect it 
 * 	const startAddMovieButton = document.querySelector('header').lastElementChild;
 */
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const inputs = addMovieModal.querySelectorAll('input');
const movies = [];
const section = document.getElementById('entry-text');
const movieList = document.getElementById('movie-list');
const deleteMovieModal = document.getElementById('delete-modal');

const updateUi = () => {
	if (movies.length === 0) {
		section.style.display = 'block'
	} else {
		section.style.display = 'none'
	}
};

const deletMovie = (movieId) => {
	let movieIndex = 0;
	for (const movie of movies) {
		if (movie.id === movieId) {
			break;
		}
		movieIndex++;
	}

	movies.splice(movieIndex, 1);
	movieList.children[movieIndex].remove(); // modern
	// IE-COMPATIBLE
	// movieList.removeChild(movieList.children[movieIndex]);
	closeMovieDeletionModal();
	updateUi();
};

const closeMovieDeletionModal = () => {
	toggleBackdrop();
	deleteMovieModal.classList.remove('visible')
}

const deleteMovieHandler = (movieId) => {
	deleteMovieModal.classList.add('visible');
	toggleBackdrop();
	const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');

	// workaround for removing event listener for bound function
	let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
	confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

	confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
	// deletMovie(movieId);

	cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
	cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal);

	confirmDeletionButton.addEventListener('click', deletMovie.bind(null, movieId));
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
	const newMovieElement = document.createElement('li');
	newMovieElement.className = 'movie-element';
	newMovieElement.innerHTML = `
		<div class="movie-element__image">
			<img src="${imageUrl}" alt="${title}">
		</div>
		<div class="movie-element__info">
			<h2>${title}</h2>
			<p>${rating}/5 stars</p>
		</div>
	`;
	newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
	movieList.append(newMovieElement);
};

const toggleBackdrop = () => {
	backdrop.classList.toggle('visible');
};

const closeMovieModal = () => {
	addMovieModal.classList.remove('visible');
}

const showMovieModal = () => {
	/**
	 * toggle() is the best; flip switch on passed class
	 */
	addMovieModal.classList.add('visible');
	toggleBackdrop();
};

const clearMovieInputs = () => {
	for (const input of inputs) {
		input.value = '';
	}
};

/**
 * 
 */
const backdropClickHandler = () => {
	closeMovieModal();
	closeMovieDeletionModal();
	clearMovieInputs();
};

/**
 * 
 */
const cancelAddMovieHandler = () => {
	closeMovieModal();
	toggleBackdrop();
	clearMovieInputs();
};

/**
 * 
 */
const addMovieHandler = () => {
	// // validate inputs
	// for (const input of inputs) {
	// 	console.dir(input)
	// }

	const titleValue = inputs[0].value;
	const imageUrlValue = inputs[1].value;
	const ratingValue = inputs[2].value;

	if (titleValue.trim() === '' ||
		imageUrlValue.trim() === '' ||
		ratingValue.trim() === '' ||
		+ratingValue < 1 || +ratingValue > 5) {
		alert('please enter valid values');
		return;
	}

	const newMovie = {
		id: Math.random().toString(),
		title: titleValue,
		image: imageUrlValue,
		rating: ratingValue
	}
	movies.push(newMovie);
	closeMovieModal();
	toggleBackdrop();
	clearMovieInputs();
	renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
	updateUi();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);

/**
 * Beware though, there are multiple divs with that class
 */
// const modalActions = document.querySelector('.modal__actions');

cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);