import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App.tsx';
import {View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {format} from 'date-fns';

type Props = NativeStackScreenProps<RootStackParamList, 'AppointmentDetail'>;

const AppointmentDetailPage = (props: Props) => {
  const theme = useTheme();
  const appointment = props.route.params.appointment;
  const patient = appointment.patient;
  return (
    <View style={{padding: 20}}>
      <Text
        style={{fontSize: 24, color: theme.colors.primary, fontWeight: 'bold'}}>
        {appointment.title} ( {format(new Date(appointment.startDate), 'HH:mm')}{' '}
        - {format(new Date(appointment.endDate), 'HH:mm')} )
      </Text>
      <Text style={{fontSize: 18, color: '#000'}}>
        {appointment.note ?? 'Aucune note'}
      </Text>
      <Text
        style={{
          fontSize: 24,
          color: theme.colors.primary,
          fontWeight: 'bold',
          marginTop: 10,
        }}>
        Patient
      </Text>
      <View style={{padding: 5}}>
        <Text style={{fontSize: 18, color: '#000', fontWeight: 'bold'}}>
          {patient.firstName} {patient.lastName}
        </Text>
        <Text style={{fontSize: 16, color: '#000'}}>{patient.note}</Text>
      </View>
    </View>
  );
};

export default AppointmentDetailPage;
