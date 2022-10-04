import { TInterestRate } from '@lib/types/IInterestRate';
import { TDongilCategory } from '@lib/types/TDongilCategory';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

type TPostChallengeResponseState = {
  challengeCategory: string;
  comment: null;
  createdAt: string;
  id: number;
  interestRate: number;
  isAchieved: number;
  isMom: boolean;
  itemName: string;
  progressList: null;
  status: 0 | 1 | 2;
  title: string;
  totalPrice: number;
  weekPrice: number;
  weeks: number;
};

type TCreateChallengeState = {
  challenge: ICreateChallengePayload;
  response: TPostChallengeResponseState | null;
  // 새로고침시 false -> step1으로
  inProcess: boolean;
};

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

const initialState: TCreateChallengeState = {
  challenge: {
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
  },
  response: null,
  inProcess: false,
};

export const createChallengeSlice = createSlice({
  name: 'createChallenge',
  initialState,
  reducers: {
    setParent(state, action: PayloadAction<boolean>) {
      state.challenge.isMom = action.payload;
    },
    setItemName(state, action: PayloadAction<string>) {
      state.challenge.itemName = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.challenge.title = action.payload;
    },
    setTotalPrice(state, action: PayloadAction<number>) {
      state.challenge.totalPrice = action.payload;
    },
    setWeekPrice(state, action: PayloadAction<number>) {
      state.challenge.weekPrice = action.payload;
    },
    setInterestRate(state, action: PayloadAction<10 | 20 | 30 | null>) {
      state.challenge.interestRate = action.payload;
    },
    setInterestPrice(state, action: PayloadAction<number>) {
      state.challenge.interestPrice = action.payload;
    },
    setWeeks(state, action: PayloadAction<number>) {
      state.challenge.weeks = action.payload;
    },
    setFileName(state, action: PayloadAction<string>) {
      state.challenge.fileName = action.payload;
    },
    setInProcess(state) {
      state.inProcess = true;
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
  setInProcess,
  setFileName,
} = createChallengeSlice.actions;

export const selectCreateChallenge = (state: RootState) =>
  state.createChallenge.challenge;
export const selectStep3InitData = (state: RootState) => {
  return {
    contractName: state.createChallenge.challenge.title,
    contractAmount: state.createChallenge.challenge.totalPrice,
  };
};
export const selectStep4InitData = (state: RootState) => {
  return {
    weekPrice: state.createChallenge.challenge.weekPrice,
    interestRate: state.createChallenge.challenge.interestRate,
    weeks: state.createChallenge.challenge.weeks,
  };
};
export const selectTotalPrice = (state: RootState) =>
  state.createChallenge.challenge.totalPrice;
export const selectInProcess = (state: RootState) =>
  state.createChallenge.inProcess;

export default createChallengeSlice.reducer;
