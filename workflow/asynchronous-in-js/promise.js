function loadOneByOnePromise() {
  createAndAppendSpinnerDiv(createNewId());

  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(response => createAndAppendImage(response[0].url, startId))
    .then(() => {
      createAndAppendSpinnerDiv(createNewId());
      return fetch(url);
    })
    .then(response => {
      return response.json();
    })
    .then(response => createAndAppendImage(response[0].url, startId))
    .then(() => {
      createAndAppendSpinnerDiv(createNewId());
      return fetch(url);
    })
    .then(response => {
      return response.json();
    })
    .then(response => createAndAppendImage(response[0].url, startId))
    .then(() => {
      createAndAppendSpinnerDiv(createNewId());
      return fetch(url);
    })
    .then(response => {
      return response.json();
    })
    .then(response => createAndAppendImage(response[0].url, startId))
    .then(() => {
      createAndAppendSpinnerDiv(createNewId());
      return fetch(url);
    })
    .then(response => {
      return response.json();
    })
    .then(response => createAndAppendImage(response[0].url, startId))
    .catch(error => {
      alert(error);
    });
}

function SameTimeLoadingPromise() {
  for (let i = 0; i < 5; i++) {
    requests.push(fetch(url));
    createAndAppendSpinnerDiv(createNewId());
  }

  Promise.all(requests)
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(responses => responses.forEach((response, index) => createAndAppendImage(response[0].url, index + 1)))
    .catch(error => {
      alert(error);
    });
}

function SameTimeLoadingAndShowFirstPromise() {
  for (let i = 0; i < 5; i++) {
    requests.push(fetch(url));
  }

  createAndAppendSpinnerDiv(createNewId());

  Promise.race(requests)
    .then(response => response.json())
    .then(response => createAndAppendImage(response[0].url, startId))
    .catch(error => alert(error));
}
