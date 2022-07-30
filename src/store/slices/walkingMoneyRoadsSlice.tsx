import { TFetchStatus } from '@lib/types/api';
import {
  TChallengeCategory,
  TInterestRate,
  TMoneyRoadStatus,
} from '@lib/types/common';
import { TItemName } from '@lib/types/kid';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import produce from 'immer';
import { RootState } from '../app/store';

export interface IMoneyRoad {
  id: number;
  isMom: boolean;
  title: string;
  itemName: TItemName;
  challengeCategoryName: TChallengeCategory;
  isAchieved: boolean;
  interestRate: TInterestRate;
  totalPrice: number;
  weekPrice: number;
  weeks: number;
  createdAt: string;
  status: TMoneyRoadStatus;
  progressList:
    | {
        challengeId: number;
        weeks: number;
        isAchieved: boolean;
      }[]
    | null;
  comment: {
    content: string;
    id: number;
  } | null;
}

export type TWalkingMoneyRoadsState = {
  walkingMoneyRoads: IMoneyRoad[] | null;
  walkingMoneyRoadsStatus?: TFetchStatus;
};

const initialState: TWalkingMoneyRoadsState = {
  walkingMoneyRoads: null,
  walkingMoneyRoadsStatus: 'idle',
};

// GET: 걷고있는 돈길 데이터 fetch
export const fetchWalkingMoneyRoads = createAsyncThunk(
  'walkingMoneyRoads/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/challenge/?status=accept');
    return response.data;
  },
);

// DELETE: 걷고있는 돈길 중도 포기
export const giveUpWalkingMoneyRoad = createAsyncThunk(
  'walkingMoneyRoads/giveUp',
  async (thunkPayload: { axiosPrivate: AxiosInstance; id: number }) => {
    const { axiosPrivate, id } = thunkPayload;
    const response = await axiosPrivate.delete(`/challenge/${id}`);
    console.log('response.data', response.data);
    return response.data;
  },
);

// PATCH: 돈길 걷기
export const walkMoneyRoad = createAsyncThunk(
  'walkingMoneyRoads/walk',
  async (thunkPayload: { axiosPrivate: AxiosInstance; id: number }) => {
    const { axiosPrivate, id } = thunkPayload;
    const response = await axiosPrivate.patch(`/progress/${id}`);
    console.log('response.data', response.data);
    return response.data;
  },
);

export const walkingMoneyRoadsSlice = createSlice({
  name: 'walkingMoneyRoads',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWalkingMoneyRoads.pending, (state) => {
        state.walkingMoneyRoadsStatus = 'loading';
      })
      .addCase(fetchWalkingMoneyRoads.fulfilled, (state, action) => {
        state.walkingMoneyRoadsStatus = 'succeeded';
        state.walkingMoneyRoads = action.payload.data;
      })
      .addCase(fetchWalkingMoneyRoads.rejected, (state, action) => {
        state.walkingMoneyRoadsStatus = 'failed';
        console.error(action.error.message);
      })
      .addCase(giveUpWalkingMoneyRoad.fulfilled, (state, action) => {
        const { id } = action.payload.data;
        state.walkingMoneyRoads = state.walkingMoneyRoads!.filter(
          (walkingMoneyRoad) => walkingMoneyRoad.id !== id,
        );
      })
      .addCase(walkMoneyRoad.fulfilled, (state, action) => {
        const { id } = action.payload.data;
        // immer
        const achievedMoneyRoad = state.walkingMoneyRoads!.find(
          (moneyRoad) => moneyRoad.id === id,
        );
        if (achievedMoneyRoad?.progressList) {
          achievedMoneyRoad.progressList[
            achievedMoneyRoad.progressList?.length - 1
          ].isAchieved = true;
        }
      })
      .addCase(walkMoneyRoad.rejected, (state, action) => {
        // api 수정하는동안 일단 테스트용!!
        const { id } = action.meta.arg;
        const achievedMoneyRoad = state.walkingMoneyRoads!.find(
          (moneyRoad) => moneyRoad.id === id,
        );
        if (achievedMoneyRoad?.progressList) {
          achievedMoneyRoad.progressList[
            achievedMoneyRoad.progressList?.length - 1
          ].isAchieved = true;
        }
      });
  },
});

export const selectWalkingMoneyRoadsStatus = (state: RootState) =>
  state.walkingMoneyRoads.walkingMoneyRoadsStatus;
export const selectWalkingMoneyRoads = (state: RootState) =>
  state.walkingMoneyRoads.walkingMoneyRoads;
export default walkingMoneyRoadsSlice.reducer;
