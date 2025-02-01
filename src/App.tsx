/* eslint-disable @typescript-eslint/no-unused-vars */
import {SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GlobalContextProvider} from './components/ContextProvider';
import StackNavigation from './navigations/StackNavigation';
import {globalStyles} from './utils/globalStyles';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Loader, testLoader} from './components/Loader';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {printLogs} from './utils/log-utils';
import {registerTranslation} from 'react-native-paper-dates';

const App: React.FC = () => {
  useEffect(() => {
    registerTranslation('enGB', {
      save: 'Save',
      selectSingle: 'SELECT DATE',
      selectMultiple: 'SELECT DATES',
      selectRange: 'SELECT PERIOD',
      notAccordingToDateFormat: inputFormat =>
        `Invalid! Date format must be in ${inputFormat}`,
      mustBeHigherThan: date => `Date must be later then ${date}`,
      mustBeLowerThan: date => `Date must be earlier then ${date}`,
      mustBeBetween: (startDate, endDate) =>
        `Dates must be between ${startDate} - ${endDate}`,
      dateIsDisabled: 'Invalid date!',
      previous: 'PREVIOUS',
      next: 'NEXT',
      typeInDate: 'Type in date',
      pickDateFromCalendar: 'Pick a date from calendar',
      close: 'CLOSE',
    });
    try {
      GoogleSignin.configure({
        webClientId:
          '190249501462-352hfghpf6gqrh499unb000eg9jkej8d.apps.googleusercontent.com',
      });
    } catch (error) {
      printLogs(
        'GoogleSignin.configure() | webClientId not found or invalid | Error thrown:',
        error,
      );
    }
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Provider store={store}>
        <PersistGate loading={testLoader()} persistor={persistor}>
          <GlobalContextProvider>
            <NavigationContainer>
              <StackNavigation />
            </NavigationContainer>
          </GlobalContextProvider>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
