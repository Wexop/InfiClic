import {
  AgendaEntry,
  CalendarProvider,
  ExpandableCalendar,
  TimelineList,
} from 'react-native-calendars';
import {Alert, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import {dateToCalendarFormat} from '../utils/utils.ts';

const HomeAgenda = (props: {date: Date}) => {
  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        style={[{height: reservation.height}]}
        onPress={() => Alert.alert(reservation.name)}>
        <Text style={{fontSize, color}}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <CalendarProvider
      date={dateToCalendarFormat(props.date)}
      showTodayButton
      disabledOpacity={0.6}
      // numberOfDays={3}
    >
      <ExpandableCalendar firstDay={1} />
      <TimelineList
        events={{}}
        showNowIndicator
        // scrollToNow
        scrollToFirst
      />
    </CalendarProvider>
  );
};

export default HomeAgenda;
