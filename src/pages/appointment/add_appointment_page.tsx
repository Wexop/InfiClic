import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App.tsx';
import {Alert, ScrollView} from 'react-native';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {useState} from 'react';
import apiClient from '../../axios/axios.ts';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';
import {Patient} from '../../type/api.type.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'AddAppointment'>;

const AddAppointmentPage = (props: Props) => {
  const baseDate = props.route.params?.date
    ? new Date(props.route.params?.date)
    : new Date();

  const [title, setTitle] = useState('');
  const [note, setNote] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(baseDate);
  const [endDate, setEndDate] = useState(baseDate);
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  const [openDateModal, setOpenDateModal] = useState(false);
  const [openStartHourModal, setOpenStartHourModal] = useState(false);
  const [openEndHourModal, setOpenEndHourModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const postAppointment = async () => {
    setLoading(true);

    await apiClient
      .post('/appointment/create', {
        title,
        startDate,
        endDate,
        note,
        patientId: patient?.id,
      })
      .catch(e => {
        Alert.alert('Erreur');
      });
    setLoading(false);
    props.navigation.replace('Home');
  };

  const theme = useTheme();
  return (
    <ScrollView style={{padding: 20}}>
      <Text
        style={{fontSize: 24, color: theme.colors.primary, fontWeight: 'bold'}}>
        Ajouter un rendez-vous
      </Text>
      <TextInput
        mode={'outlined'}
        value={title}
        label={'Titre'}
        onChangeText={setTitle}
      />
      <TextInput
        mode={'outlined'}
        value={note ?? undefined}
        label={'Note'}
        onChangeText={setNote}
        multiline
        numberOfLines={3}
      />
      <TextInput
        mode={'outlined'}
        value={startDate.toLocaleDateString()}
        label={'Date'}
        onPress={() => setOpenDateModal(true)}
      />
      <TextInput
        mode={'outlined'}
        value={format(startDate, 'hh:mm')}
        label={'Heure de départ'}
        onPress={() => setOpenStartHourModal(true)}
      />
      <TextInput
        mode={'outlined'}
        value={format(endDate, 'hh:mm')}
        label={'Heure de fin'}
        onPress={() => setOpenEndHourModal(true)}
      />
      <TextInput
        mode={'outlined'}
        value={`${patient?.firstName ?? ''} ${patient?.lastName ?? ''}`}
        label={'Patient'}
        onPress={() =>
          props.navigation.push('SelectPatient', {onSelect: setPatient})
        }
      />
      <DatePicker
        modal
        open={openDateModal}
        title={'Date'}
        mode={'date'}
        date={startDate}
        onConfirm={date => {
          setStartDate(date);
          setOpenDateModal(false);
        }}
      />

      <DatePicker
        modal
        open={openStartHourModal}
        mode={'time'}
        title={'Heure de début'}
        date={startDate}
        onConfirm={date => {
          setStartDate(date);
          setOpenStartHourModal(false);
        }}
      />

      <DatePicker
        modal
        open={openEndHourModal}
        mode={'time'}
        title={'Heure de fin'}
        date={endDate}
        onConfirm={date => {
          setEndDate(date);
          setOpenEndHourModal(false);
        }}
      />

      <Button
        disabled={!title || !patient || loading}
        mode={'contained'}
        loading={loading}
        onPress={postAppointment}
        style={{marginTop: 75}}>
        Ajouter un rendez-vous
      </Button>
    </ScrollView>
  );
};

export default AddAppointmentPage;
