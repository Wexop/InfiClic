import {format} from 'date-fns';

export const dateToCalendarFormat = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};
