import {format} from 'date-fns';

export const dateToCalendarFormat = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const timeToString = (time: number | Date) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};
