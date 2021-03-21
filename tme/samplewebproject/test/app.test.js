const assert = require('assert');

it('has a text input', async () => {
  const dom = await render('index.html');

  const input = dom.window.document.querySelector('input');

  assert(input);
});

it('input has valid email', async () => {
  const dom = await render('index.html');

  const input = dom.window.document.querySelector('input');
  input.value = 'test@example.com';

  dom.window.document
    .querySelector('form')
    .dispatchEvent(new dom.window.Event('submit'));

  const h1 = dom.window.document.querySelector('h1');
  assert.strictEqual(h1.innerHTML, 'Valid email');
});

it('input has invalid email', async () => {
  const dom = await render('index.html');

  const input = dom.window.document.querySelector('input');
  input.value = 'testexample.com';

  dom.window.document
    .querySelector('form')
    .dispatchEvent(new dom.window.Event('submit'));

  const h1 = dom.window.document.querySelector('h1');
  assert.strictEqual(h1.innerHTML, 'Invalid email');
});
