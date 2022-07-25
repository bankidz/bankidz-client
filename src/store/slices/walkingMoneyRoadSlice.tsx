import { axiosPublic } from '@lib/api/axios';
import { TFetchStatus } from '@lib/types/api';
import { TChallengeCategory, TInterestRate } from '@lib/types/common';
import { TItemName, TMoneyRoadStatus } from '@lib/types/kid';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

export interface IMoneyRoad {
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
}

export type TWalkingMoneyRoadState = {
  walkingMoneyRoad: IMoneyRoad[];
  walkingMoneyRoadStatus?: TFetchStatus;
};

const initialState: TWalkingMoneyRoadState = {
  walkingMoneyRoad: [
    {
      id: 8,
      isMom: true,
      title: '아이패드 사기',
      targetItemName: '전자제품',
      challengeCategoryName: '이자율 받기',
      isAchieved: false,
      interestRate: 10,
      totalPrice: 150000,
      weekPrice: 10000,
      weeks: 15,
      createdAt: '2022-07-14 03:28:29',
      status: 2,
      progressList: [
        {
          challengeId: 8,
          weeks: 1,
          isAchieved: false,
        },
      ],
      comment: null,
    },
  ],
  walkingMoneyRoadStatus: 'idle',
};

// GET: 걷고있는 돈길 데이터 fetch
export const fetchWalkingMoneyRoad = createAsyncThunk(
  'walkingMoneyRoad/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/challenge/?status=accept');
    console.log(response.data);
    return response.data;
  },
);

export const walkingMoneyRoadSlice = createSlice({
  name: 'walkingMoneyRoad',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWalkingMoneyRoad.pending, (state) => {
        state.walkingMoneyRoadStatus = 'loading';
      })
      .addCase(fetchWalkingMoneyRoad.fulfilled, (state, action) => {
        state.walkingMoneyRoadStatus = 'succeeded';
        state.walkingMoneyRoad.concat(action.payload.data);
      })
      .addCase(fetchWalkingMoneyRoad.rejected, (state, action) => {
        state.walkingMoneyRoadStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectWalkingMoneyRoadStatus = (state: RootState) =>
  state.walkingMoneyRoad.walkingMoneyRoadStatus;
export const selectWalkingMoneyRoad = (state: RootState) =>
  state.walkingMoneyRoad.walkingMoneyRoad;
export default walkingMoneyRoadSlice.reducer;
