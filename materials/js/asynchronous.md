# Asynchronous in JavaScript

<div style="float: right" align="center">
  <img src="../../assets/async.svg" width="300">
</div>

Getting know to asynchronous in JavaScript

There are four ways to write async (aka asynchronous) code in JS. Let’s dive into it more deeply and learn how to handle async code.

- [Callbacks](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing#async_callbacks)
- [Promises](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing#promises)
- [Async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Functions-Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

<br />
As an example, we can use “setTimeout” to simulate async event.

<div style="clear: both;" />

## Callbacks

```javascript
setTimeout(() => {
  console.log(`Got called trough ~500ms after setTimeout function has called`);
}, 500);
```

## Promises

```javascript
new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.round(Math.random())) {
      // generates random value from 0 to 1
      resolve(`Got called trough ~500ms after setTimeout function has called`);
    } else {
      reject(`Something went wrong!`);
    }
  }, 500);
})
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Async/await

```javascript
try {
  const result = await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.round(Math.random())) {
        // generates random value from 0 to 1
        resolve(
          `Got called trough ~500ms after setTimeout function has called`
        );
      } else {
        reject(`Something went wrong!`);
      }
    }, 500);
  });
  console.log(result);
} catch (error) {
  console.error(error);
}
```

## Functions-Generators

```javascript
function* generatorFunction() {
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.round(Math.random())) {
        // generates random value from 0 to 1
        resolve(
          `Got called trough ~500ms after setTimeout function has called`
        );
      } else {
        reject(`Something went wrong!`);
      }
    }, 500);
  });
}

generatorFunction()
  .next()
  .value.then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
```

# Requirements

Make basic markup of a page by placing 3 images in a row. Align them vertically in center.

1. Load 5 images one by one using [endpoint](https://api.thecatapi.com/v1/images/search) and render them on the page in the following order.<br>
   **Additional Requirements**
   - Task should be done using each method listed above
   - Show loader for each image that is in loading
2. Load 5 images at the same time (it means not one by one. All the api requests should be called at the same time). Once all the images have loaded render them together. Please use endpoint from task listed above.<br>
   **Additional Requirements**
   - Task should be done using each method listed above
   - Show on page loader for case while all the images haven’t been loaded
   - In case of error for one of images please show an error message
3. Load 5 images at the same time as you did it in previous task but render only first downloaded image. You should cancel all other requests that have hot finished yet.<br>
   **Additional Requirements**
   - Task should be done using each method listed above
   - Show on page loader for case while first image hasn’t been loaded
