import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App.tsx';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderLogoutButton = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <IconButton
      icon={() => <Icon name="settings" size={30} color="#fff" />}
      onPress={() => navigation.navigate('Profil')}
    />
  );
};

export default HeaderLogoutButton;
