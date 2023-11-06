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

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    setSigninResp: (state, action: PayloadAction<TSigninResProps>) => {
      state.userInfo = action.payload;
    },
  },
});

export const {setSigninResp} = incomeSlice.actions;
export default incomeSlice.reducer;
