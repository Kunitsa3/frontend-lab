const loadOneByOneCallback = () => {
  const loadImage = (url, whatToCall) => {
    createAndAppendSpinnerDiv(createNewId());

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      const src = JSON.parse(xhr.response || null)?.[0]?.url;
      createImage(src, whatToCall);
    };
    xhr.onerror = error => {
      handleErrors(error);
    };
    xhr.send();
  };

  const createImage = (src, cb) => {
    createAndAppendImage(src, startId);
    cb && cb();
  };

  loadImage(url, () => loadImage(url, () => loadImage(url, () => loadImage(url, () => loadImage(url)))));
};

const SameTimeLoadingCallback = () => {
  const callBacksQueue = [];

  const loadImage = url => {
    const currentId = createNewId();
    createAndAppendSpinnerDiv(currentId);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      const src = JSON.parse(xhr.response || null)?.[0]?.url;
      callBacksQueue.push(() => {
        createImage(src, currentId);
      });
      if (callBacksQueue.length === urls.length) {
        callBacksQueue.forEach(callback => callback());
      }
    };
    xhr.onerror = error => {
      handleErrors(error);
    };
    xhr.send();
  };

  const createImage = (src, id) => {
    createAndAppendImage(src, id);
  };

  urls.forEach(loadImage);
};

const SameTimeLoadingAndShowFirstCallback = () => {
  let isResponseOnload = false;

  createAndAppendSpinnerDiv(createNewId());

  const loadImage = url => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onload = () => {
      if (!isResponseOnload) {
        isResponseOnload = true;
        const src = JSON.parse(xhr.response || null)?.[0]?.url;
        createImage(src);
      }
    };
    xhr.onerror = error => {
      handleErrors(error);
    };
    xhr.send();
  };

  const createImage = src => {
    createAndAppendImage(src, startId);
  };

  urls.forEach(url => loadImage(url));
};
