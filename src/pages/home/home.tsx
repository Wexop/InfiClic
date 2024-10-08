import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App.tsx';
import HomeCalendar from '../../components/home_calendar.tsx';
import {useState} from 'react';
import AgendaItem from '../../components/agenda_item.tsx';
import {IconButton, useTheme} from 'react-native-paper';

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
      <IconButton
        style={{
          backgroundColor: theme.colors.primary,
          position: 'absolute',
          alignSelf: 'center',
          bottom: 10,
        }}
        iconColor={'#fff'}
        mode={'contained'}
        icon={'plus'}
        size={40}
      />
    </View>
  );
};

export default HomePage;
