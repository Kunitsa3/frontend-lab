const loadOneByOnePromise = () => {
  const load = url => {
    createAndAppendSpinnerDiv(createNewId());

    return fetch(url)
      .then(response => response.json())
      .then(response => createAndAppendImage(response[0].url, startId));
  };

  load(url)
    .then(() => load(url))
    .then(() => load(url))
    .then(() => load(url))
    .then(() => load(url))
    .catch(error => {
      alert(error);
    });
};

const SameTimeLoadingPromise = () => {
  urls.forEach(url => {
    responses.push(fetch(url).then(r => r.json()));
    createAndAppendSpinnerDiv(createNewId());
  });

  Promise.all(responses)
    .then(contents => contents.forEach((content, index) => createAndAppendImage(content[0].url, index + 1)))
    .catch(error => {
      alert(error);
    });
};

const SameTimeLoadingAndShowFirstPromise = () => {
  urls.forEach(url => {
    requests.push(fetch(url));
  });

  createAndAppendSpinnerDiv(createNewId());

  Promise.race(requests)
    .then(response => response.json())
    .then(response => createAndAppendImage(response[0].url, startId))
    .catch(error => alert(error));
};
