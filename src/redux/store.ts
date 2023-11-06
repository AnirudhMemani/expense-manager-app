import {combineReducers, configureStore} from '@reduxjs/toolkit';
import incomeSlice from './reducers/income-slice';
import loginSlice from './reducers/login-slice';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist';

const reducers = combineReducers({
  login: loginSlice,
  income: incomeSlice,
});

const persistConfig = {
  key: 'root',
  storage: EncryptedStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
