exports = (() => {
  const numberOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const formatComponents = ['YYYY', 'MM', 'DD'];

  const appendZero = value => (value < 10 ? `0${value}` : value);

  const appendEndingS = (number, word) => (!!number && number + ` ${number > 1 ? `${word}s` : word}`) || '';

  const addWhitespace = value => (value ? ` ${value}` : value || '');

  const addPrefixSuffix = (value, isSuffix) => (isSuffix ? `${value} ago` : `in ${value}`);

  return {
    appendZero,
    appendEndingS,
    addWhitespace,
    addPrefixSuffix,
    formatComponents,
    numberOfDaysInMonth,
  };
})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = exports;
} else {
  window.helpers = exports;
}
