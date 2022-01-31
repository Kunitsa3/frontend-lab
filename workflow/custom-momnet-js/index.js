const numberOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const getZero = value => {
  return value < 10 ? '0' + value : value;
};

const getS = (number, word) => {
  return (!!number && number + ` ${number > 1 ? word + 's' : word}`) || '';
};

const addWhitespace = value => {
  return value ? ' ' + value : value || '';
};

const addPrefixSuffix = (value, isSuffix) => {
  return isSuffix ? value + ' ago' : 'in ' + value;
};

class OneMoment extends Date {
  constructor(...value) {
    super(...value);
  }

  static parse(date, format) {
    const formatComponents = ['YYYY', 'MM', 'DD'];

    const dateComponents = formatComponents.reduce((acc, curr) => {
      const indexOfFormatComponent = format.indexOf(curr);

      if (indexOfFormatComponent >= 0) {
        acc[curr] = date.substr(indexOfFormatComponent, curr.length);
      }

      return acc;
    }, {});

    return new OneMoment(
      dateComponents['YYYY'] || 1970,
      dateComponents['MM'] - 1 || 0,
      dateComponents['DD'] || 1,
      -new Date().getTimezoneOffset() / 60,
      -new Date().getTimezoneOffset() % 60,
      0,
      0,
    );
  }

  format(formatStr) {
    const newFormatHelper = {
      YYYY: () => this.getFullYear(),
      MM: () => getZero(this.getMonth() + 1),
      DD: () => getZero(this.getDate()),
    };

    let newFormatStr = Object.entries(newFormatHelper).reduce((acc, curr) => {
      return acc.replace(curr[0], curr[1]());
    }, formatStr);

    return newFormatStr;
  }

  fromNow() {
    const isFuture = this.getTime() - Date.now() > 0;
    const [startTime, endTime] = isFuture ? [new OneMoment(), this] : [this, new OneMoment()];

    const endTimeFullYears = endTime.getFullYear();
    const startTimeFullYears = startTime.getFullYear();
    const endTimeMonth = endTime.getMonth();
    const startTimeMonth = startTime.getMonth();
    const endTimeDate = endTime.getDate();
    const startTimeDate = startTime.getDate();

    let years = endTimeFullYears - startTimeFullYears;

    if (startTimeFullYears < endTimeFullYears && startTimeMonth > endTimeMonth) {
      years -= 1;
    } else if (
      startTimeFullYears < endTimeFullYears &&
      startTimeMonth === endTimeMonth &&
      startTimeDate > endTimeDate
    ) {
      years -= 1;
    }

    let months = (endTimeMonth <= startTimeMonth ? endTimeMonth + 12 : endTimeMonth) - startTimeMonth;

    let days = numberOfDaysInMonth[startTimeMonth] - startTimeDate + endTimeDate;

    if (endTimeDate >= startTimeDate) {
      days -= numberOfDaysInMonth[startTimeMonth];
    } else {
      months -= 1;
    }

    if (months >= 12) {
      months -= 12;
    }

    const yearPhrase = getS(years, 'year');
    const monthPhrase = getS(months, 'month');
    const dayPhrase = getS(days, 'day');

    const finalPhrase = yearPhrase + addWhitespace(monthPhrase) + addWhitespace(dayPhrase || '');

    if (!finalPhrase) {
      return 'now';
    }

    return addPrefixSuffix(finalPhrase, !isFuture);
  }

  toDate() {
    return new Date(this);
  }
}
