import {View} from 'react-native';
import {Card, Divider, Text, useTheme} from 'react-native-paper';
import {Appointment} from '../type/api.type.ts';
import {format} from 'date-fns';

const AgendaItem = (props: {data: Appointment; onPress?: () => void}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          justifyContent: 'center',
        }}>
        <Text style={{color: theme.colors.backdrop}}>
          {format(new Date(props.data.startDate), 'hh:mm')}
        </Text>
        <Divider
          bold
          style={{width: 200, position: 'absolute', left: 40, height: 2}}
        />
      </View>

      <Card
        style={{
          backgroundColor: theme.colors.primary,
          width: '80%',
          alignSelf: 'flex-end',
        }}>
        <Card.Title title={props.data.title} />
      </Card>
    </View>
  );
};

export default AgendaItem;
