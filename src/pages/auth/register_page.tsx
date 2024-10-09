import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App.tsx';
import {Alert, Image, View} from 'react-native';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {useState} from 'react';
import axios from 'axios';
import {API_URL} from '../../axios/axios.ts';
import {LoginResponse} from '../../type/api.type.ts';
import {useAppDispatch} from '../../store/redux_hook.ts';
import {updateToken} from '../../store/slice.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterPage = (props: Props) => {
  const [login, setLogin] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profession, setProfession] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const onLogin = async () => {
    setIsLoading(true);
    const response = await axios
      .post<LoginResponse>(`${API_URL}/user/register`, {
        email: login,
        password,
        firstName,
        lastName,
        profession,
      })
      .catch(() => {
        Alert.alert('Erreur', 'Email ou mot de passe invalide');
      });

    const token = response?.data?.token;

    setIsLoading(false);

    if (token) {
      dispatch(updateToken(token));
    }
  };

  const theme = useTheme();

  return (
    <View style={{padding: 20}}>
      <Text
        style={{fontSize: 24, color: theme.colors.primary, fontWeight: 'bold'}}>
        Créer un compte
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
        value={password}
        label={'Mot de passe'}
        mode={'outlined'}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            onPress={() => setShowPassword(!showPassword)}
            icon={showPassword ? 'eye-off' : 'eye'}
          />
        }
      />
      <TextInput
        style={{marginTop: 25}}
        mode={'outlined'}
        value={profession}
        label={'Profession'}
        onChangeText={setProfession}
      />
      <Button
        disabled={!login || !password || isLoading || !firstName || !lastName}
        mode={'contained'}
        loading={isLoading}
        onPress={onLogin}
        style={{marginTop: 75}}>
        Créer un compte
      </Button>
    </View>
  );
};

export default RegisterPage;
