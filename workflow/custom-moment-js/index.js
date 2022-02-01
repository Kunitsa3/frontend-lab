const { appendZero, appendEndingS, addWhitespace, addPrefixSuffix, formatComponents, numberOfDaysInMonth } =
  typeof module !== 'undefined' && typeof module.require !== 'undefined' ? require('./helper') : window.helpers;

class OneMoment extends Date {
  constructor(...value) {
    super(...value);
  }

  static parse(date, format) {
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
      YYYY: this.getFullYear(),
      MM: appendZero(this.getMonth() + 1),
      DD: appendZero(this.getDate()),
    };

    return Object.entries(newFormatHelper).reduce(
      (acc, [formatString, value]) => acc.replace(formatString, value),
      formatStr,
    );
  }

  fromNow() {
    const isFuture = this.getTime() - Date.now() > 0;
    const [startDate, endDate] = isFuture ? [new OneMoment(), this] : [this, new OneMoment()];

    const endDateFullYears = endDate.getFullYear();
    const startDateFullYears = startDate.getFullYear();
    const endDateMonth = endDate.getMonth();
    const startDateMonth = startDate.getMonth();
    const endDateDate = endDate.getDate();
    const startDateDate = startDate.getDate();

    let years = endDateFullYears - startDateFullYears;

    if (startDateFullYears < endDateFullYears && startDateMonth > endDateMonth) {
      years -= 1;
    } else if (
      startDateFullYears < endDateFullYears &&
      startDateMonth === endDateMonth &&
      startDateDate > endDateDate
    ) {
      years -= 1;
    }

    let months = (endDateMonth <= startDateMonth ? endDateMonth + 12 : endDateMonth) - startDateMonth;

    let days = numberOfDaysInMonth[startDateMonth] - startDateDate + endDateDate;

    if (endDateDate >= startDateDate) {
      days -= numberOfDaysInMonth[startDateMonth];
    } else {
      months -= 1;
    }

    if (months >= 12) {
      months -= 12;
    }

    const yearPhrase = appendEndingS(years, 'year');
    const monthPhrase = appendEndingS(months, 'month');
    const dayPhrase = appendEndingS(days, 'day');

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

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = OneMoment;
} else {
  window.OneMoment = OneMoment;
}
