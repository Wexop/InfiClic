import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App.tsx';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useState} from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginPage = (props: Props) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <TextInput value={login} label={'Email'} onChangeText={setLogin} />
      <TextInput
        value={password}
        label={'Mot de passe'}
        onChangeText={setPassword}
        textContentType={'password'}
      />
    </View>
  );
};

export default LoginPage;
