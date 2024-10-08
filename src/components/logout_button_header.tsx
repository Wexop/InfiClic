import {useAppDispatch} from '../store/redux_hook.ts';
import {Button} from 'react-native-paper';
import {updateToken} from '../store/slice.ts';

const HeaderLogoutButton = () => {
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(updateToken(undefined));
  };

  return (
    <Button onPress={logout} textColor={'#fff'}>
      Se déconnecter
    </Button>
  );
};

export default HeaderLogoutButton;
