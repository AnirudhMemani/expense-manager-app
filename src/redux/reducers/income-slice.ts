import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IIncomeSliceProps} from '../types';

const initialState: IIncomeSliceProps = {
  loader: false,
};

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    },
  },
});

export const {setLoadingStatus} = incomeSlice.actions;
export default incomeSlice.reducer;
