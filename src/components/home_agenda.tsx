import {Agenda, AgendaEntry} from 'react-native-calendars';
import {timeToString} from '../utils/utils.ts';
import {Alert, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';

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
    <Agenda
      renderItem={renderItem}
      items={{
        [timeToString(props.date)]: [
          {name: 'test', height: 200, day: timeToString(props.date)},
        ],
      }}
    />
  );
};

export default HomeAgenda;
