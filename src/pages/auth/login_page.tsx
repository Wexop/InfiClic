import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App.tsx';
import {View} from 'react-native';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {useState} from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginPage = (props: Props) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();

  return (
    <View style={{padding: 20}}>
      <Text
        style={{fontSize: 24, color: theme.colors.primary, fontWeight: 'bold'}}>
        Bienvenue
      </Text>
      <TextInput
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
            icon="eye"
          />
        }
      />
      <Button mode={'contained'} style={{marginTop: 75}}>
        Se connecter
      </Button>
    </View>
  );
};

export default LoginPage;
