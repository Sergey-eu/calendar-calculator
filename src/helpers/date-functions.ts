// get destructured date from UI string format (DD / MM / YYYY)
export function getDateParts(date: string) {
  const dateParts = date.split(" / ");

  return {
    year: Number(dateParts[2]),
    month: Number(dateParts[1]),
    // month: Number(dateParts[1]) - 1,
    day: Number(dateParts[0]),
  };
}

export function validateDate(date: string) {
  type ValidationResult = {
    isValid: boolean;
    errors: Array<string>;
  };
  const year = getDateParts(date).year;
  const month = getDateParts(date).month - 1;
  const day = getDateParts(date).day;
  const newDate = new Date(year, month, day);
  const validationResult: ValidationResult = {
    isValid: false,
    errors: [],
  };

  if (
    // Date range check
    year < 3000 &&
    year > 1900 &&
    // Date existance check
    newDate.getMonth() === month &&
    newDate.getDate() === day
  ) {
    validationResult.isValid = true;
  } else {
    if (year > 2999 || year < 1901 || isNaN(year)) {
      validationResult.errors.push(
        "The year is not in the valid range, please select between 1901 and 2999"
      );
    }
    if (month > 11 || month < 0 || isNaN(month)) {
      validationResult.errors.push(
        "The month is not in the valid range, select from 01 to 12"
      );
    }
    if (
      (newDate.getDate() !== day && newDate.toString() !== "Invalid Date") ||
      day === 0
    ) {
      validationResult.errors.push("There is no such day");
    }
    validationResult.isValid = false;
  }
  return validationResult;
}

export function dateInputMask(date: string) {
  if (date.match(/^\d{2}$/) || date.match(/^\d{2}\s\/\s\d{2}$/)) {
    return date + ' / ';
  } else if (date.match(/^\d{2}\s\/$/) || date.match(/^\d{2}\s\/\s\d{2}\s\/$/)) {
    return date.slice(0, -3);
  } else {
    // prevent mask elements removing by user
    if ((date.length >= 5 && (date.match(/\s\/\s/g) || []).length < 1) ||
      (date.length >= 7 && (date.match(/\s\/\s/g) || []).length < 2)) {
      return
    }
    return date;
  }
}
