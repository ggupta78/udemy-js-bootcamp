document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();

  const { value } = document.querySelector('input');

  const h1 = document.querySelector('h1');
  if (value.includes('@')) {
    h1.innerHTML = 'Valid email';
  } else {
    h1.innerHTML = 'Invalid email';
  }
});
