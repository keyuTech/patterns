const button = document.getElementById('button');

button.addEventListener('click', () => {
  import('./math.js').then((module) => {
    console.log('Add: ', module.add(1, 2));
    console.log('Multiply: ', module.multiply(3, 2));

    const button = document.getElementById('button');
    button.innerHTML = 'Check the console';
  });
});
