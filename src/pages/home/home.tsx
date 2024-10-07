import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App.tsx';
import HomeCalendar from '../../components/home_calendar.tsx';
import {useState} from 'react';
import HomeAgenda from '../../components/home_agenda.tsx';
import {Title} from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomePage = (props: Props) => {
  const [date, setDate] = useState(new Date());

  const onChangeDate = (date: Date) => {
    setDate(date);
  };

  return (
    <View>
      <HomeCalendar onChangeDate={onChangeDate} date={date} />
      <Title>{date.toDateString()}</Title>
      <HomeAgenda date={date} />
    </View>
  );
};

export default HomePage;
