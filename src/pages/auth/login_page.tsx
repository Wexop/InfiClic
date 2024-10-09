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

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginPage = (props: Props) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const onLogin = async () => {
    setIsLoading(true);
    const response = await axios
      .post<LoginResponse>(`${API_URL}/user/loginToken`, {
        email: login,
        password,
      })
      .catch(e => {
        console.log(e);
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
        Bienvenue
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
      <Button
        disabled={!login || !password || isLoading}
        mode={'contained'}
        loading={isLoading}
        onPress={onLogin}
        style={{marginTop: 75}}>
        Se connecter
      </Button>

      <Button
        onPress={() => props.navigation.navigate('Register')}
        mode={'text'}
        style={{marginTop: 30}}>
        Pas de compte ? Inscris toi
      </Button>
    </View>
  );
};

export default LoginPage;
