import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App.tsx';
import {Linking, Platform, ScrollView, View} from 'react-native';
import {Button, Text, useTheme} from 'react-native-paper';
import {format} from 'date-fns';
import {LeafletView} from 'react-native-leaflet-view';
import apiClient from '../../axios/axios.ts';
import {useState} from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'AppointmentDetail'>;

const AppointmentDetailPage = (props: Props) => {
  const theme = useTheme();
  const appointment = props.route.params.appointment;
  const patient = appointment.patient;

  const [loading, setLoading] = useState(false);

  const latlng = {
    lat: patient.latitude,
    lng: patient.longitude,
  };

  const openItinary = () => {
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${patient.latitude},${patient.longitude}`;
    const label = `${patient.firstName} place`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    if (typeof url === 'string') {
      Linking.openURL(url);
    }
  };

  const onDelete = async () => {
    setLoading(true);

    await apiClient
      .delete(`/appointment/delete/${appointment.id}`)
      .catch(e => console.log(e));

    setLoading(false);
    props.navigation.replace('Home');
  };

  return (
    <ScrollView style={{padding: 20}}>
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
      {patient.longitude && patient.latitude && (
        <>
          <View style={{height: '60%'}}>
            <LeafletView
              mapCenterPosition={latlng}
              doDebug={false}
              mapMarkers={[
                {
                  position: latlng,
                  icon: '📍',
                  size: [32, 32],
                },
              ]}
            />
          </View>
          <Button
            style={{marginTop: 20}}
            mode={'contained'}
            onPress={openItinary}>
            Itinéraire
          </Button>
        </>
      )}
      <Button
        mode={'text'}
        disabled={loading}
        loading={loading}
        buttonColor={'red'}
        textColor={'#fff'}
        icon={'delete'}
        onPress={onDelete}
        style={{marginTop: 20}}>
        Supprimer le rendez-vous
      </Button>
    </ScrollView>
  );
};

export default AppointmentDetailPage;
