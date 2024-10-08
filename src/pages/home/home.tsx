import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App.tsx';
import HomeCalendar from '../../components/home_calendar.tsx';
import {useState} from 'react';
import AgendaItem from '../../components/agenda_item.tsx';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomePage = (props: Props) => {
  const [date, setDate] = useState(new Date());

  const onChangeDate = (date: Date) => {
    setDate(date);
  };

  return (
    <View>
      <HomeCalendar onChangeDate={onChangeDate} date={date} />
      <AgendaItem name={'Test'} />
    </View>
  );
};

export default HomePage;
