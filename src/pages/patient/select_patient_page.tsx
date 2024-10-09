import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App.tsx';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import {Patient} from '../../type/api.type.ts';
import {Text} from 'react-native-paper';
import apiClient from '../../axios/axios.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'SelectPatient'>;

const SelectPatientPage = (props: Props) => {
  const [patientList, setPatientList] = useState<Patient[] | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);

  const getPatients = async () => {
    setLoading(true);

    const response = await apiClient
      .get<Patient[]>('/patient/MyPatients')
      .catch(e => console.log(e));
    console.log(response?.data);
    setPatientList(response?.data);

    setLoading(false);
  };

  useEffect(() => {
    getPatients();
  }, [props.route.params]);

  return (
    <View style={{padding: 30}}>
      {loading && <ActivityIndicator size={30} />}
      <FlatList
        data={patientList}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                props.route.params?.onSelect?.(item);
                props.navigation.goBack();
              }}>
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  marginTop: 10,
                }}>
                <Text>
                  {item.firstName} {item.lastName}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default SelectPatientPage;
