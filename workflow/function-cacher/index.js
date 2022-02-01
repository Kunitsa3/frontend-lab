math.config({
  number: 'BigNumber',
});

class Cacher {
  constructor() {}

  deepEqual(x, y) {
    if (x === y) {
      return true;
    } else if (typeof x === 'object' && x !== null && typeof y === 'object' && y !== null) {
      if (Object.keys(x).length !== Object.keys(y).length) {
        return false;
      }

      for (let key in x) {
        if (y.hasOwnProperty(key)) {
          if (!this.deepEqual(x[key], y[key])) {
            return false;
          }
        } else {
          return false;
        }
      }

      return true;
    } else {
      return false;
    }
  }

  withCache(callback) {
    let cache = {};

    return (...arg) => {
      for (let key in cache) {
        if (this.deepEqual(JSON.parse(JSON.stringify(arg)), JSON.parse(key))) {
          return cache[key];
        }
      }

      return (cache[JSON.stringify(arg)] = callback(...arg));
    };
  }
}

const cacher = new Cacher();

const calculateFactorial = a => {
  return math.evaluate(`${a}!`);
};
const cachedCalculateFactorial = cacher.withCache(calculateFactorial);

const resultParagraph = document.querySelector('#result');
const timeParagraph = document.querySelector('#time');
const calculateButton = document.querySelector('#calculate');
const argumentsInput = document.querySelector('#arguments');

calculateButton.addEventListener('click', function () {
  const args = argumentsInput.value;
  calculateButton.classList.add('.disabled');
  const startTime = Date.now();
  resultParagraph.textContent = cachedCalculateFactorial(args);
  const finalTime = Date.now();
  timeParagraph.textContent = finalTime - startTime + ' ms';
  calculateButton.classList.remove('.disabled');
});
