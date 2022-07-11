import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { axiosPublic } from '../../lib/api/axios';
import { RootState } from '../app/store';

type TChallengePayloadState = {
  isMom: boolean | null;
  itemName: string | null;
  title: string | null;
  interestRate: number | null;
  totalPrice: number | null;
  weekPrice: number | null;
  weeks: number | null;
};

const initialState: TChallengePayloadState = {
  isMom: null,
  itemName: null,
  title: null,
  interestRate: null,
  totalPrice: null,
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
  },
});

export const { dispatchParent, dispatchItemName } =
  challengePayloadSlice.actions;

export const selectChallengePayload = (state: RootState) =>
  state.challengePayload;

export default challengePayloadSlice.reducer;
