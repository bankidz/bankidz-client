import { axiosPublic } from '@lib/api/axios';
import { TRequestStatus } from '@lib/types/api';
import { TChallengeCategory, TInterestRate } from '@lib/types/common';
import { TItemName, TMoneyRoadStatus } from '@lib/types/kid';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

export type TWalkingMoneyRoadState = {
  walkingMoneyRoad: {
    id: number | null;
    isMom: boolean | null;
    title: string | null;
    targetItemName: TItemName | null;
    challengeCategoryName: TChallengeCategory | null;
    isAchieved: boolean | null;
    interestRate: TInterestRate | null;
    totalPrice: number | null;
    weekPrice: number | null;
    weeks: number | null;
    createdAt: string | null;
    status: TMoneyRoadStatus | null;
    progressList:
      | {
          challengeId: number;
          weeks: number;
          isAchieved: boolean;
        }[]
      | null;
    comment: string | null;
  };
  walkingMoneyRoadRequestStatus: TRequestStatus;
};

const initialState: TWalkingMoneyRoadState = {
  walkingMoneyRoad: {
    id: null,
    isMom: null,
    title: null,
    targetItemName: null,
    challengeCategoryName: null,
    isAchieved: null,
    interestRate: null,
    totalPrice: null,
    weekPrice: null,
    weeks: null,
    createdAt: null,
    status: null,
    progressList: null,
    comment: null,
  },
  walkingMoneyRoadRequestStatus: 'idle',
};

// GET: 걷고있는 돈길 정보 fetch
export const fetchWalkingMoneyRoad = createAsyncThunk(
  'walkingMoneyRoad/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/challenge/?status=accept');
    console.log(response.data);
    return response.data;
  },
);

export const WalkingMoneyRoadSlice = createSlice({
  name: 'walkingMoneyRoad',
  initialState,
  reducers: {
    
  },
});

export const {} = WalkingMoneyRoadSlice.actions;

export const selectWalkingMoneyRoadRequestStatus = (state: RootState) =>
  state.walkingMoneyRoad.walkingMoneyRoadRequestStatus;

export default WalkingMoneyRoadSlice.reducer;

// const response = await axiosPublic.get('/health');
// console.log(response.data);
