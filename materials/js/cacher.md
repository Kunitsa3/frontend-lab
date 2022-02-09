# Function cacher

<div style="float: right" align="center">
  <img  src="../../assets/cacher.svg" width="300">
</div>

Implement a Cacher class that helps you cache the return value of a function.
The next function call with the same arguments should return the value from the cache without additional calculations.

E.g.

```javascript
cachedFactorial = cacher.withCache(factorial);
const a = cachedFactorial(someBigNumber); // => very long calculations...
const b = cachedFactorial(someBigNumber); // => the result is returned from the cache - very quickly,
```

## Requirements

- Ability to create multiple cache instances using `new Cacher()`
- For the demo - create a html page with the input and the "Calc" button which runs calculations. The result of the function call should appear on the page after the button click.

### 👇 Maybe it'll help you 👇:

☘️ Use the [math.js](https://github.com/josdejong/mathjs) lib to work with the large numbers.</br>
☘️ Also, you can use Factorial function from this lib
