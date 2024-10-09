import React from 'react';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  useTheme,
} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import HomePage from './src/pages/home/home.tsx';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {LocaleConfig} from 'react-native-calendars/src';
import LoginPage from './src/pages/auth/login_page.tsx';
import {Provider} from 'react-redux';
import {useAppSelector} from './src/store/redux_hook.ts';
import {store} from './src/store/store.ts';
import HeaderLogoutButton from './src/components/logout_button_header.tsx';
import AddPatientPage from './src/pages/patient/add_patient_page.tsx';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  AddPatient: undefined;
};

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    primary: '#60C3BE',
  },
};

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = 'fr';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <MainApp />
      </Provider>
    </PaperProvider>
  );
}

const MainApp = () => {
  const theme = useTheme();
  const baseHeaderStyle: NativeStackNavigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: theme.colors.primary,
    },
    headerRight: () => <HeaderLogoutButton />,
  };

  const userToken = useAppSelector(state => state.auth.token);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken && (
          <>
            <Stack.Screen
              options={baseHeaderStyle}
              name="Home"
              component={HomePage}
            />
            <Stack.Screen
              options={baseHeaderStyle}
              name="AddPatient"
              component={AddPatientPage}
            />
          </>
        )}
        {!userToken && (
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={LoginPage}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
