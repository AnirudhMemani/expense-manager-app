import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ITagProps} from '../../components/types';

export interface ITransactionProps {
  displayImageUri: string | undefined;
  tags: ITagProps[];
  transactionAmount: string;
  operationRecords: string;
  currentValue: string;
  previousOperator: string;
}

const initialState: ITransactionProps = {
  displayImageUri: undefined,
  transactionAmount: '',
  operationRecords: '',
  currentValue: '',
  previousOperator: '',
  tags: [
    {
      id: 1,
      tag: 'online🛒',
      isDummy: true,
    },
    {
      id: 2,
      tag: 'vacation🌳',
      isDummy: true,
    },
    {
      id: 3,
      tag: 'sports⚽',
      isDummy: true,
    },
    {
      id: 4,
      tag: 'business💰',
      isDummy: true,
    },
    {
      id: 5,
      tag: 'groceries🧋',
      isDummy: true,
    },
  ],
};

const TransactionSlice = createSlice({
  name: 'Transaction',
  initialState,
  reducers: {
    setDisplayImageUri: (state, action: PayloadAction<string | undefined>) => {
      state.displayImageUri = action.payload;
    },
    setTags: (state, action: PayloadAction<ITagProps[]>) => {
      state.tags = action.payload;
    },
    setTransactionAmount: (state, action: PayloadAction<string>) => {
      state.transactionAmount = action.payload;
    },
    setOperationRecords: (state, action: PayloadAction<string>) => {
      state.operationRecords = action.payload;
    },
    setCurrentValue: (state, action: PayloadAction<string>) => {
      state.currentValue = action.payload;
    },
    setPreviousOperator: (state, action: PayloadAction<string>) => {
      state.previousOperator = action.payload;
    },
  },
});

export const {
  setDisplayImageUri,
  setTags,
  setTransactionAmount,
  setOperationRecords,
  setCurrentValue,
  setPreviousOperator,
} = TransactionSlice.actions;
export default TransactionSlice.reducer;
