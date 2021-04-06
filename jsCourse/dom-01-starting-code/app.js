// // the modern way; but a snapshot: will get stale
// const listItemElements = document.querySelectorAll('li')

// // old way but it does return a live list, not a snapshot
// const oldWay = document.getElementsByTagName('li')

// const h1 = document.getElementById('main-title');
// h1.style.color = 'white';
// h1.textContent = 'Some new title'
// h1.style.backgroundColor = 'black'

// const li = document.querySelector('li:last-of-type');
// li.textContent = li.textContent + '(Changed)'

// for (const listItemEl of oldWay) {
// 	console.dir(listItemEl)
// }

const section = document.querySelector('section');
// section.style.backgroundColor = 'blue';
const button = document.querySelector('button');

/**
 * classList method of getting and setting 
 */
button.addEventListener('click', () => {
	section.classList.toggle('invisible');
	section.classList.toggle('visible');
})

// section.className = '' // this overwrites the HTML element's style attribute

