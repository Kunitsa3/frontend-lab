math.config({
  number: 'BigNumber',
});

const deepEqual = (firstObject, secondObject) => {
  if (firstObject === secondObject) {
    return true;
  } else if (
    typeof firstObject === 'object' &&
    firstObject !== null &&
    typeof secondObject === 'object' &&
    secondObject !== null
  ) {
    if (Object.keys(firstObject).length !== Object.keys(secondObject).length) {
      return false;
    }

    for (let key in firstObject) {
      if (secondObject.hasOwnProperty(key)) {
        if (!deepEqual(firstObject[key], secondObject[key])) {
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
};

class Cacher {
  constructor() {}

  withCache(callback) {
    let cache = {};

    return (...arg) => {
      for (let key in cache) {
        if (deepEqual(JSON.parse(JSON.stringify(arg)), JSON.parse(key))) {
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
