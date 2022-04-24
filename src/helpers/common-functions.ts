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
