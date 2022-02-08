function loadOneByOneCallback() {
  function loadImage(url, callback, whatToCall) {
    createAndAppendSpinnerDiv(createNewId());

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
      const src = JSON.parse(xhr.response)[0].url;
      callback(null, src, whatToCall);
    };
    xhr.onerror = function () {
      callback(error);
    };
    xhr.send();
  }

  function createImage(error, src, collLoadImage) {
    if (error) {
      alert(error);
    } else {
      createAndAppendImage(src, startId);
      collLoadImage?.();
    }
  }

  loadImage(url, createImage, () =>
    loadImage(url, createImage, () =>
      loadImage(url, createImage, () => loadImage(url, createImage, () => loadImage(url, createImage))),
    ),
  );
}

function SameTimeLoadingCallback() {
  const callBacksQueue = [];

  function loadImage(url, callback) {
    const currentId = createNewId();
    createAndAppendSpinnerDiv(currentId);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
      const src = JSON.parse(xhr.response)[0].url;
      callBacksQueue.push(() => {
        callback(null, src, currentId);
      });
      if (callBacksQueue.length === 5) {
        callBacksQueue.forEach(callback => callback());
      }
    };
    xhr.onerror = function () {
      callback(error);
    };
    xhr.send();
  }

  function createImage(error, src, id) {
    if (error) {
      alert(error);
    } else {
      createAndAppendImage(src, id);
    }
  }

  loadImage(url, createImage);
  loadImage(url, createImage);
  loadImage(url, createImage);
  loadImage(url, createImage);
  loadImage(url, createImage);
}

function SameTimeLoadingAndShowFirstCallback() {
  let flag = false;

  createAndAppendSpinnerDiv(createNewId());

  function loadImage(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onload = function () {
      if (!flag) {
        flag = true;
        const src = JSON.parse(xhr.response)[0].url;
        callback(null, src);
      }
    };
    xhr.onerror = function () {
      callback(new Error('Невозможно загрузить изображение'));
    };
    xhr.send();
  }

  function createImage(error, src) {
    if (error) {
      alert(error);
    } else {
      createAndAppendImage(src, startId);
    }
  }

  loadImage(url, createImage);
  loadImage(url, createImage);
  loadImage(url, createImage);
  loadImage(url, createImage);
  loadImage(url, createImage);
}
