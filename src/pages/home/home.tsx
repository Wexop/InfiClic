import {ActivityIndicator, FlatList, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App.tsx';
import HomeCalendar from '../../components/home_calendar.tsx';
import {useEffect, useState} from 'react';
import AgendaItem from '../../components/agenda_item.tsx';
import {Button, Text, useTheme} from 'react-native-paper';
import {AllAppointment, Appointment} from '../../type/api.type';
import apiClient from '../../axios/axios.ts';
import {format} from 'date-fns';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomePage = (props: Props) => {
  const theme = useTheme();
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[] | undefined>(
    undefined,
  );

  const [everyAppointments, setEveryAppointments] = useState<
    AllAppointment[] | undefined
  >(undefined);

  const [loading, setLoading] = useState(false);

  props.navigation.setOptions({
    headerLeft: () => <></>,
  });

  const onChangeDate = async () => {
    setLoading(true);
    setAppointments(undefined);
    const response = await apiClient.get<Appointment[]>(
      'appointment/AppointmentPerDate',
      {
        params: {
          date: format(date, 'yyyy-MM-dd') + 'T00:00',
        },
      },
    );

    console.log(response.data);
    setAppointments(response.data);

    setLoading(false);
  };

  const getEveryAppointments = async () => {
    setLoading(true);
    setEveryAppointments(undefined);
    const response = await apiClient.get<AllAppointment[]>(
      'appointment/AllMyAppointments',
    );

    console.log(response.data);
    setEveryAppointments(response.data);

    setLoading(false);
  };

  useEffect(() => {
    getEveryAppointments();
  }, []);

  useEffect(() => {
    onChangeDate();
  }, [date]);

  return (
    <View style={{height: '100%'}}>
      <HomeCalendar
        everyAppointments={everyAppointments}
        onChangeDate={setDate}
        date={date}
      />
      {loading && <ActivityIndicator size={30} />}
      {!appointments?.length && !loading && (
        <Text style={{padding: 20}}>Pas de rendez-vous à ce jour.</Text>
      )}
      <View style={{height: '45%'}}>
        <FlatList
          showsVerticalScrollIndicator
          persistentScrollbar
          data={appointments}
          renderItem={({item}) => {
            return (
              <AgendaItem
                data={item}
                onPress={() =>
                  props.navigation.navigate('AppointmentDetail', {
                    appointment: item,
                  })
                }
              />
            );
          }}
        />
      </View>

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
        <Button
          mode={'contained'}
          icon={'plus'}
          onPress={() => props.navigation.navigate('AddAppointment', {date})}>
          RDV
        </Button>
      </View>
    </View>
  );
};

export default HomePage;
