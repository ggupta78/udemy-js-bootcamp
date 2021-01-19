const input = document.querySelector('#userName');

input.addEventListener('keydown', function (e) {
  console.log('Key Down with ' + e.key);
});

input.addEventListener('keyup', function (e) {
  console.log('Key Up with ' + e.key);
});

input.addEventListener('keypress', function (e) {
  console.log('Key Press with ' + e.key);
});
