/* eslint-disable @typescript-eslint/no-unused-vars */
import {SafeAreaView} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GlobalContextProvider} from './components/ContextProvider';
import StackNavigation from './navigations/StackNavigation';
import {globalStyles} from './utils/globalStyles';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Loader, testLoader} from './components/Loader';

const App: React.FC = () => {
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
