const loadOneByOneAsync = async () => {
  const loadAndInnerImage = async () => {
    try {
      const id = createNewId();
      createAndAppendSpinnerDiv(id);
      const response = await fetch(url);
      content = await response.json();
      createAndAppendImage(content[0].url, id);
    } catch (err) {
      handleErrors(err);
    }
  };

  for (let i = 0; i < urls.length; i++) {
    await loadAndInnerImage(urls[i]);
  }
};

const SameTimeLoadingAsync = () => {
  urls.forEach(url => {
    responses.push(fetch(url).then(response => response.json()));
    createAndAppendSpinnerDiv(createNewId());
  });

  const getImages = async () => {
    try {
      const content = await Promise.all(responses);
      content.forEach((content, index) => createAndAppendImage(content[0].url, index + 1));
    } catch (error) {
      handleErrors(error);
    }
  };

  getImages();
};

const SameTimeLoadingAndShowFirstAsync = () => {
  createAndAppendSpinnerDiv(createNewId());

  urls.forEach(url => {
    requests.push(fetch(url));
  });

  const getImages = async () => {
    try {
      const response = await Promise.race(requests);
      const content = await response.json();
      createAndAppendImage(content[0].url, startId);
    } catch (error) {
      handleErrors(error);
    }
  };

  getImages();
};
