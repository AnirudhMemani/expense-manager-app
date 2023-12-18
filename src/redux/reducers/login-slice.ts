import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TSigninResProps} from '../../screens/Login/types';
import {ILoginSliceProps} from '../types';

const initialState: ILoginSliceProps = {
  userInfo: {
    idToken: '',
    serverAuthCode: '',
    scopes: [],
    user: {
      email: '',
      familyName: '',
      givenName: '',
      id: '',
      name: '',
      photo: '',
    },
  },
};

const LoginSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {
    setSigninResp: (state, action: PayloadAction<TSigninResProps>) => {
      state.userInfo = action.payload;
    },
  },
});

export const {setSigninResp} = LoginSlice.actions;
export default LoginSlice.reducer;
