import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App.tsx';
import {Image, View} from 'react-native';
import {useEffect, useState} from 'react';
import {Profil} from '../../type/api.type.ts';
import apiClient from '../../axios/axios.ts';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {useAppDispatch} from '../../store/redux_hook.ts';
import {updateToken} from '../../store/slice.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'Profil'>;

const ProfilPage = (props: Props) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profession, setProfession] = useState('');
  const [id, setId] = useState<number | undefined>(undefined);

  props.navigation.setOptions({headerRight: () => <></>});

  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(updateToken(undefined));
  };

  const getData = async () => {
    setLoading(true);

    const response = await apiClient
      .get<Profil>('/user/me')
      .catch(e => console.log(e));

    const profil = response?.data;
    if (profil) {
      setId(profil?.id);
      setFirstName(profil.firstName);
      setLastName(profil.lastName);
      setProfession(profil.profession);
      setLogin(profil.email);
    }

    setLoading(false);
  };

  const onUpdate = async () => {
    setLoading(true);

    await apiClient
      .put('/user/update', {
        id,
        firstName,
        lastName,
        email: login,
        profession,
      })
      .catch(e => console.log(e));

    setLoading(false);

    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{padding: 20}}>
      <Text
        style={{fontSize: 24, color: theme.colors.primary, fontWeight: 'bold'}}>
        Profil
      </Text>
      <Image
        style={{width: 75, height: 75, alignSelf: 'center', marginTop: 25}}
        source={{uri: 'logo'}}
      />
      <TextInput
        style={{marginTop: 25}}
        mode={'outlined'}
        value={login}
        label={'Email'}
        onChangeText={setLogin}
      />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 25,
          justifyContent: 'space-between',
        }}>
        <TextInput
          mode={'outlined'}
          value={firstName}
          label={'Prénom'}
          onChangeText={setFirstName}
          style={{width: '45%'}}
        />
        <TextInput
          style={{width: '45%'}}
          mode={'outlined'}
          value={lastName}
          label={'Nom'}
          onChangeText={setLastName}
        />
      </View>
      <TextInput
        style={{marginTop: 25}}
        mode={'outlined'}
        value={profession}
        label={'Profession'}
        onChangeText={setProfession}
      />
      <Button
        disabled={!login || loading || !firstName || !lastName || !id}
        mode={'contained'}
        loading={loading}
        onPress={onUpdate}
        style={{marginTop: 75}}>
        Mettre à jour
      </Button>
      <Button onPress={logout} style={{marginTop: 20}}>
        Déconnexion
      </Button>
    </View>
  );
};

export default ProfilPage;
