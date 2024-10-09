import {Calendar} from 'react-native-calendars';
import {useTheme} from 'react-native-paper';
import {dateToCalendarFormat} from '../utils/utils.ts';
import {AllAppointment} from '../type/api.type.ts';

const HomeCalendar = (props: {
  date: Date;
  onChangeDate: (date: Date) => void;
  everyAppointments?: AllAppointment[];
}) => {
  const theme = useTheme();

  const allAppointments: any = {};

  props.everyAppointments?.forEach(a => {
    allAppointments[dateToCalendarFormat(new Date(a.startDate))] = {
      marked: true,
    };
  });

  return (
    <Calendar
      markedDates={{
        ...allAppointments,
        [dateToCalendarFormat(props.date)]: {
          selected: true,
          disableTouchEvent: true,
          selectedColor: theme.colors.primary,
          selectedTextColor: '#ffffff',
          marked:
            allAppointments[dateToCalendarFormat(props.date)]?.marked || false,
        },
      }}
      onDayPress={date => {
        props.onChangeDate(new Date(date.dateString));
      }}
      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: theme.colors.primary,
        selectedDayTextColor: '#ffffff',
        //todayTextColor: '#ffffff',
        //  todayBackgroundColor: theme.colors.primary,
        dayTextColor: '#2d4150',
        textDisabledColor: '#c2c2c2',
      }}
      style={{marginBottom: 10}}
    />
  );
};

export default HomeCalendar;
