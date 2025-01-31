const loadOneByOneGenerator = () => {
  const getResponse = async urlToFetch => {
    createAndAppendSpinnerDiv(createNewId());
    const response = await fetch(urlToFetch);
    return await response.json();
  };

  function* generateImage() {
    for (const url of urls) {
      const result = yield getResponse(url);
      createAndAppendImage(result[0].url, startId);
    }
  }

  let generator = generateImage();

  const run = (generator, result) => {
    let currentResult = generator.next(result);

    if (!currentResult.done) {
      currentResult.value.then(content => run(generator, content)).catch(handleErrors);
    }
  };

  run(generator);
};

const SameTimeLoadingGenerator = () => {
  const getResponse = async urlToFetch => {
    createAndAppendSpinnerDiv(createNewId());
    const response = await fetch(urlToFetch);
    return await response.json();
  };

  function* generateImage() {
    let result = yield Promise.all(urls.map(url => getResponse(url)));
    result.forEach((response, index) => createAndAppendImage(response[0].url, index + 1));
  }

  let generator = generateImage();

  const run = (generator, result) => {
    let currentResult = generator.next(result);

    if (!currentResult.done) {
      currentResult.value.then(content => run(generator, content)).catch(handleErrors);
    }
  };

  run(generator);
};

const SameTimeLoadingAndShowFirstGenerator = () => {
  createAndAppendSpinnerDiv(createNewId());

  const getResponse = async urlToFetch => {
    const response = await fetch(urlToFetch);
    return await response.json();
  };

  function* generateImage() {
    let result = yield Promise.race(urls.map(url => getResponse(url)));
    createAndAppendImage(result[0].url, startId);
  }

  let generator = generateImage();

  const run = (generator, result) => {
    let currentResult = generator.next(result);

    if (!currentResult.done) {
      currentResult.value.then(content => run(generator, content)).catch(handleErrors);
    }
  };

  run(generator);
};
