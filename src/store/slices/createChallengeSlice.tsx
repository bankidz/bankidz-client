import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { TInterestRate } from '@lib/types/IInterestRate';
import { TDongilCategory } from '@lib/types/TDongilCategory';

export interface ICreateChallengePayload {
  challengeCategory: TDongilCategory;
  isMom: boolean | null;
  itemName: string | null;
  title: string;
  interestRate: TInterestRate | null;
  interestPrice: number;
  totalPrice: number;
  weekPrice: number;
  weeks: number;
  fileName: string;
}

const initialState: ICreateChallengePayload = {
  challengeCategory: '이자율 받기',
  isMom: null,
  itemName: null,
  title: '',
  interestRate: null,
  interestPrice: 0,
  totalPrice: 0,
  weekPrice: 0,
  weeks: 0,
  fileName: '',
};

export const createChallengeSlice = createSlice({
  name: 'createChallenge',
  initialState,
  reducers: {
    setParent(state, action: PayloadAction<boolean>) {
      state.isMom = action.payload;
    },
    setItemName(state, action: PayloadAction<string>) {
      state.itemName = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setTotalPrice(state, action: PayloadAction<number>) {
      state.totalPrice = action.payload;
    },
    setWeekPrice(state, action: PayloadAction<number>) {
      state.weekPrice = action.payload;
    },
    setInterestRate(state, action: PayloadAction<10 | 20 | 30 | null>) {
      state.interestRate = action.payload;
    },
    setInterestPrice(state, action: PayloadAction<number>) {
      state.interestPrice = action.payload;
    },
    setWeeks(state, action: PayloadAction<number>) {
      state.weeks = action.payload;
    },
    setFileName(state, action: PayloadAction<string>) {
      state.fileName = action.payload;
    },
    resetChallengePayload() {
      return initialState;
    },
  },
});

export const {
  setParent,
  setItemName,
  setTitle,
  setTotalPrice,
  setWeekPrice,
  setInterestRate,
  setInterestPrice,
  setWeeks,
  resetChallengePayload,
  setFileName,
} = createChallengeSlice.actions;

export const selectCreateChallenge = (state: RootState) =>
  state.createChallenge;
export const selectStep3InitData = (state: RootState) => {
  return {
    contractName: state.createChallenge.title,
    contractAmount: state.createChallenge.totalPrice,
  };
};
export const selectStep4InitData = (state: RootState) => {
  return {
    weekPrice: state.createChallenge.weekPrice,
    interestRate: state.createChallenge.interestRate,
    weeks: state.createChallenge.weeks,
  };
};
export const selectTotalPrice = (state: RootState) =>
  state.createChallenge.totalPrice;

export default createChallengeSlice.reducer;
