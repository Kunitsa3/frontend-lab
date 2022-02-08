function loadOneByOneGenerator() {
  async function* generateImage() {
    for (let i = 0; i <= 4; i++) {
      createAndAppendSpinnerDiv(createNewId());
      const response = await fetch(url);
      content = await response.json();
      createAndAppendImage(content[0].url, startId);

      yield i;
    }
  }

  (async () => {
    try {
      let generator = generateImage();
      for await (let value of generator) {
      }
    } catch (error) {
      alert(error);
    }
  })();
}

function SameTimeLoadingGenerator() {
  for (let i = 0; i < 5; i++) {
    requests.push(fetch(url));
    createAndAppendSpinnerDiv(createNewId());
  }

  function* generateSequence() {
    yield Promise.all(requests);
  }

  generateSequence()
    .next()
    .value.then(responses => Promise.all(responses.map(r => r.json())))
    .then(responses => responses.forEach((response, index) => createAndAppendImage(response[0].url, index + 1)))
    .catch(error => {
      alert(error);
    });
}

function SameTimeLoadingAndShowFirstGenerator() {
  createAndAppendSpinnerDiv(createNewId());

  for (let i = 0; i < 5; i++) {
    requests.push(fetch(url));
  }

  function* generateSequence() {
    yield Promise.race(requests);
  }

  generateSequence()
    .next()
    .value.then(response => response.json())
    .then(response => createAndAppendImage(response[0].url, startId))
    .catch(error => {
      alert(error);
    });
}
