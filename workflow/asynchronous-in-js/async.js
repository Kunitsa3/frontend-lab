function loadOneByOneAsync() {
  async function loadAndInnerImage() {
    try {
      const id = createNewId();
      createAndAppendSpinnerDiv(id);
      const response = await fetch(url);
      content = await response.json();
      createAndAppendImage(content[0].url, id);
    } catch (err) {
      alert(err);
    }
  }

  async function loadImages() {
    await loadAndInnerImage();
    await loadAndInnerImage();
    await loadAndInnerImage();
    await loadAndInnerImage();
    await loadAndInnerImage();
  }

  loadImages();
}

function SameTimeLoadingAsync() {
  for (let i = 0; i < 5; i++) {
    requests.push(fetch(url));
    createAndAppendSpinnerDiv(createNewId());
  }

  (async function getImages() {
    try {
      const responses = await Promise.all(requests);
      const content = await Promise.all(responses.map(response => response.json()));
      content.forEach((content, index) => createAndAppendImage(content[0].url, index + 1));
    } catch (error) {
      alert(error);
    }
  })();
}

function SameTimeLoadingAndShowFirstAsync() {
  createAndAppendSpinnerDiv(createNewId());

  for (let i = 0; i < 5; i++) {
    requests.push(fetch(url));
  }

  async function getImages() {
    try {
      const response = await Promise.race(requests);
      const content = await response.json();
      createAndAppendImage(content[0].url, startId);
    } catch (error) {
      alert(error);
    }
  }

  getImages();
}
