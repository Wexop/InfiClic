import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App.tsx';
import {Alert, FlatList, ScrollView, View} from 'react-native';
import {Button, Card, Text, TextInput, useTheme} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {Address, OpenStreeMapResponse, Patient} from '../../type/api.type.ts';
import axios from 'axios';
import useDebounce from '../../hooks/userdebounce.ts';
import apiClient from '../../axios/axios.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'AddPatient'>;

const AddPatientPage = (props: Props) => {
  const [firstname, setFirsname] = useState('');
  const [lastname, setlastname] = useState('');
  const [note, setNote] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState<Address | undefined>(undefined);
  const [addressSearch, setAddressSearch] = useState('');
  const [addressResults, setAddressResults] = useState<OpenStreeMapResponse[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(addressSearch, 500); // Délais de 500ms

  const postPatient = async () => {
    setIsLoading(true);
    await apiClient
      .post('/patient/create', {
        firstname,
        lastname,
        note,
        phoneNumber: phone,
        ...address,
      } as Patient)
      .catch(e => {
        Alert.alert('Erreur');
      });
    setIsLoading(false);
    props.navigation.goBack();
  };

  const getAdressResults = async () => {
    const response = await axios.get<OpenStreeMapResponse[]>(
      `https://nominatim.openstreetmap.org/search?q=${addressSearch}&format=json&addressdetails=1&limit=5`,
    );
    setAddressResults(response.data);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      getAdressResults();
    }
  }, [debouncedSearchTerm]);

  const theme = useTheme();
  return (
    <ScrollView style={{padding: 20}}>
      <Text
        style={{fontSize: 24, color: theme.colors.primary, fontWeight: 'bold'}}>
        Ajouter un patient
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 25,
          justifyContent: 'space-between',
        }}>
        <TextInput
          mode={'outlined'}
          value={firstname}
          label={'Prénom'}
          onChangeText={setFirsname}
          style={{width: '45%'}}
        />
        <TextInput
          style={{width: '45%'}}
          mode={'outlined'}
          value={lastname}
          label={'Nom'}
          onChangeText={setlastname}
        />
      </View>
      <TextInput
        mode={'outlined'}
        value={phone}
        label={'Téléphone'}
        onChangeText={setPhone}
      />
      <TextInput
        mode={'outlined'}
        value={note}
        label={'Note'}
        onChangeText={setNote}
        multiline
        numberOfLines={3}
      />
      {address && (
        <>
          <TextInput
            mode={'outlined'}
            value={` ${address.zipCode ?? ''} ${address.country ?? ''} ${
              address.city ?? ''
            } ${address.street ?? ''} ${address.houseNumber ?? ''} `}
            label={'Adresse'}
            disabled
            right={
              <TextInput.Icon
                color={'#000'}
                icon={'close'}
                onPress={() => setAddress(undefined)}
              />
            }
            onChangeText={setAddressSearch}
          />
        </>
      )}
      {!address && (
        <>
          <TextInput
            mode={'outlined'}
            value={addressSearch}
            label={'Address'}
            onChangeText={setAddressSearch}
          />
          {addressResults && (
            <FlatList
              scrollEnabled={false}
              style={{maxHeight: '100%'}}
              data={addressResults}
              renderItem={({item}) => {
                return (
                  <Card
                    onPress={() => {
                      setAddress({
                        city: item.address.city,
                        houseNumber: item.address.house_number,
                        street: item.address.road,
                        zipCode: item.address.postcode,
                        country: item.address.country,
                        latitude: item.lat,
                        longitude: item.lon,
                      });
                      setAddressSearch('');
                      setAddressResults([]);
                    }}
                    contentStyle={{
                      backgroundColor: theme.colors.primary,
                      borderRadius: 10,
                    }}
                    style={{marginTop: 10}}>
                    <Card.Title title={item.display_name} />
                  </Card>
                );
              }}
            />
          )}
        </>
      )}
      <Button
        disabled={!firstname || !lastname || isLoading}
        mode={'contained'}
        loading={isLoading}
        onPress={postPatient}
        style={{marginTop: 75}}>
        Ajouter un patient
      </Button>
    </ScrollView>
  );
};

export default AddPatientPage;
