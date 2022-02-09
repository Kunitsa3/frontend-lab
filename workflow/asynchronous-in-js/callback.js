const loadOneByOneCallback = () => {
  const loadImage = (url, whatToCall) => {
    createAndAppendSpinnerDiv(createNewId());

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      const src = JSON.parse(xhr.response || null)?.[0]?.url;
      createImage(null, src, whatToCall);
    };
    xhr.onerror = () => {
      createImage(error);
    };
    xhr.send();
  };

  const createImage = (error, src, cb) => {
    if (error) {
      alert(error);
    } else {
      createAndAppendImage(src, startId);
      cb && cb();
    }
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
        createImage(null, src, currentId);
      });
      if (callBacksQueue.length === 5) {
        callBacksQueue.forEach(callback => callback());
      }
    };
    xhr.onerror = () => {
      createImage(error);
    };
    xhr.send();
  };

  const createImage = (error, src, id) => {
    if (error) {
      alert(error);
    } else {
      createAndAppendImage(src, id);
    }
  };

  urls.forEach(url => loadImage(url));
};

const SameTimeLoadingAndShowFirstCallback = () => {
  let isResponseOnload = false;

  createAndAppendSpinnerDiv(createNewId());

  const loadImage = url => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onload = function () {
      if (!isResponseOnload) {
        isResponseOnload = true;
        const src = JSON.parse(xhr.response || null)?.[0]?.url;
        createImage(null, src);
      }
    };
    xhr.onerror = function () {
      createImage(new Error('Невозможно загрузить изображение'));
    };
    xhr.send();
  };

  const createImage = (error, src) => {
    if (error) {
      alert(error);
    } else {
      createAndAppendImage(src, startId);
    }
  };

  urls.forEach(url => loadImage(url));
};
