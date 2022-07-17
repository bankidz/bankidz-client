import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import useAxiosPrivate from '@hooks/api/useAxiosPrivate';
import { RootState } from '../app/store';

type TChallengePayloadState = {
  isMom: boolean | null;
  itemName: string | null;
  title: string;
  interestRate: 10 | 20 | 30 | null;
  totalPrice: number;
  weekPrice: number;
  weeks: number | null;
};

const initialState: TChallengePayloadState = {
  isMom: null,
  itemName: null,
  title: '',
  interestRate: null,
  totalPrice: 0,
  weekPrice: 0,
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
    dispatchWeekPrice(state, action: PayloadAction<number>) {
      state.weekPrice = action.payload;
    },
    dispatchInterestRate(state, action: PayloadAction<10 | 20 | 30 | null>) {
      state.interestRate = action.payload;
    },
  },
});

export const {
  dispatchParent,
  dispatchItemName,
  dispatchTitle,
  dispatchTotalPrice,
  dispatchWeekPrice,
  dispatchInterestRate,
} = challengePayloadSlice.actions;

export const selectChallengePayload = (state: RootState) =>
  state.challengePayload;
export const selectStep3InitData = (state: RootState) => {
  return {
    contractName: state.challengePayload.title,
    contractAmount: state.challengePayload.totalPrice,
  };
};
export const selectStep4InitData = (state: RootState) => {
  return {
    weekPrice: state.challengePayload.weekPrice,
    interestRate: state.challengePayload.interestRate,
  };
};
export const selectTotalPrice = (state: RootState) =>
  state.challengePayload.totalPrice;

export default challengePayloadSlice.reducer;
