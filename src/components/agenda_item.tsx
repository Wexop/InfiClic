import {View} from 'react-native';
import {Card, Divider, Text, useTheme} from 'react-native-paper';

const AgendaItem = (props: {name: string; onPress?: () => void}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          justifyContent: 'center',
        }}>
        <Text style={{color: theme.colors.backdrop}}>8: 00</Text>
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
        <Card.Title title={props.name} />
      </Card>
    </View>
  );
};

export default AgendaItem;
