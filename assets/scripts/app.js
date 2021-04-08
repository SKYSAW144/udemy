const getUserInput = () => {
  const enteredVal = prompt('Enter a value?', 'not entered');

  alert(enteredVal);
};

const buttonEl = document.querySelector('header button');
buttonEl.addEventListener('click', () => getUserInput());
