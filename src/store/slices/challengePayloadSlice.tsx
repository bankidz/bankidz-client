import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { axiosPublic } from '../../lib/api/axios';
import { RootState } from '../app/store';

type TChallengePayloadState = {
  isMom: boolean | null;
  itemName: string | null;
  title: string;
  interestRate: number | null;
  totalPrice: number;
  weekPrice: number | null;
  weeks: number | null;
};

const initialState: TChallengePayloadState = {
  isMom: null,
  itemName: null,
  title: '',
  interestRate: null,
  totalPrice: 0,
  weekPrice: null,
  weeks: null,
};

export const challengePayloadSlice = createSlice({
  name: 'challengePayload',
  initialState,
  reducers: {
    dispatchParent(state, action: PayloadAction<boolean>) {
      state.isMom = action.payload;
    },
    dispatchItemName(state, action: PayloadAction<string>) {
      state.itemName = action.payload;
    },
    dispatchTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    dispatchTotalPrice(state, action: PayloadAction<number>) {
      state.totalPrice = action.payload;
    },
  },
});

export const {
  dispatchParent,
  dispatchItemName,
  dispatchTitle,
  dispatchTotalPrice,
} = challengePayloadSlice.actions;

export const selectChallengePayload = (state: RootState) =>
  state.challengePayload;
export const selectStep3InitData = (state: RootState) => {
  return {
    contractName: state.challengePayload.title,
    contractAmount: state.challengePayload.totalPrice,
  };
};

export default challengePayloadSlice.reducer;
