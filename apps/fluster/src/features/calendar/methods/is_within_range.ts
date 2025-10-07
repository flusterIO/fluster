import { DateArg, isWithinInterval } from "date-fns";


export const isWithinRange = (date: DateArg<Date>, range: [DateArg<Date>, DateArg<Date>]) => {
  return isWithinInterval(date, { start: range[0], end: range[1] });
}

export const isWithinRanges = (date: DateArg<Date>, ranges: [DateArg<Date>, DateArg<Date>][]) => {
  return ranges.some(range => isWithinRange(date, range));
}
