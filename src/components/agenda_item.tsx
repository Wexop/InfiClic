import {View} from 'react-native';
import {Card, Divider, Text, useTheme} from 'react-native-paper';
import {Appointment} from '../type/api.type.ts';
import {format} from 'date-fns';

const AgendaItem = (props: {data: Appointment; onPress?: () => void}) => {
  const theme = useTheme();

  const subtext = `${format(new Date(props.data.startDate), 'HH')}h${format(
    new Date(props.data.startDate),
    'mm',
  )} - ${format(new Date(props.data.endDate), 'HH')}h${format(
    new Date(props.data.endDate),
    'mm',
  )}`;

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
          {format(new Date(props.data.startDate), 'HH:mm')}
        </Text>
        <Divider
          bold
          style={{width: 200, position: 'absolute', left: 40, height: 2}}
        />
      </View>

      <Card
        onPress={props.onPress}
        style={{
          backgroundColor: theme.colors.primary,
          width: '80%',
          alignSelf: 'flex-end',
        }}>
        <Card.Title title={props.data.title} titleStyle={{fontSize: 18}} />
        <Card.Content>
          <Text style={{color: '#FFF'}}>{subtext}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default AgendaItem;
