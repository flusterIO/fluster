import { DateArg, differenceInCalendarDays } from 'date-fns';

export const isSameDay = (a: DateArg<Date>, b: DateArg<Date>)  => {
  return differenceInCalendarDays(a, b) === 0;
}
