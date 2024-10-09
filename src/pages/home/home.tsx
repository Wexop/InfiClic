import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App.tsx';
import HomeCalendar from '../../components/home_calendar.tsx';
import {useState} from 'react';
import AgendaItem from '../../components/agenda_item.tsx';
import {Button, useTheme} from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomePage = (props: Props) => {
  const theme = useTheme();
  const [date, setDate] = useState(new Date());

  const onChangeDate = (date: Date) => {
    setDate(date);
  };

  return (
    <View style={{height: '100%'}}>
      <HomeCalendar onChangeDate={onChangeDate} date={date} />
      <AgendaItem name={'Test'} />
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          bottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '55%',
        }}>
        <Button
          onPress={() => props.navigation.navigate('AddPatient')}
          mode={'contained'}
          icon={'plus'}>
          Patient
        </Button>
        <Button mode={'contained'} icon={'plus'}>
          RDV
        </Button>
      </View>
    </View>
  );
};

export default HomePage;
