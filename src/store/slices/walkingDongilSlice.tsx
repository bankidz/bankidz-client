import { TFetchStatus } from '@lib/types/api';
import {
  TChallengeCategory,
  TInterestRate,
  TDongilStatus,
} from '@lib/types/common';
import { TItemName } from '@lib/types/kid';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

export interface IDongil {
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
  status: TDongilStatus;
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

export type TWalkingDongilsState = {
  walkingDongils: IDongil[] | null;
  walkingDongilsStatus?: TFetchStatus;
  isWalkingDongilsPatched: boolean;
};

const initialState: TWalkingDongilsState = {
  walkingDongils: null,
  walkingDongilsStatus: 'idle',
  isWalkingDongilsPatched: false,
};

// GET: 걷고있는 돈길 데이터 fetch
export const fetchWalkingDongils = createAsyncThunk(
  'walkingDongils/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/challenge/?status=accept');
    return response.data;
  },
);

// DELETE: 걷고있는 돈길 중도 포기
export const giveUpWalkingDongil = createAsyncThunk(
  'walkingDongils/giveUp',
  async (thunkPayload: { axiosPrivate: AxiosInstance; id: number }) => {
    const { axiosPrivate, id } = thunkPayload;
    const response = await axiosPrivate.delete(`/challenge/${id}`);
    console.log('response.data', response.data);
    return response.data;
  },
);

// PATCH: 돈길 걷기
export const walkDongil = createAsyncThunk(
  'walkingDongils/walk',
  async (thunkPayload: { axiosPrivate: AxiosInstance; id: number }) => {
    const { axiosPrivate, id } = thunkPayload;
    const response = await axiosPrivate.patch(`/progress/${id}`);
    console.log('response.data', response.data);
    return response.data;
  },
);

export const walkingDongilsSlice = createSlice({
  name: 'walkingDongils',
  initialState,
  reducers: {
    dispatchResetIsPatched(state) {
      state.isWalkingDongilsPatched = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWalkingDongils.pending, (state) => {
        state.walkingDongilsStatus = 'loading';
      })
      .addCase(fetchWalkingDongils.fulfilled, (state, action) => {
        state.walkingDongilsStatus = 'succeeded';
        state.walkingDongils = action.payload.data;
      })
      .addCase(fetchWalkingDongils.rejected, (state, action) => {
        state.walkingDongilsStatus = 'failed';
        console.error(action.error.message);
      })
      .addCase(giveUpWalkingDongil.fulfilled, (state, action) => {
        const { id } = action.payload.data;
        state.walkingDongils = state.walkingDongils!.filter(
          (walkingDongil) => walkingDongil.id !== id,
        );
      })
      .addCase(walkDongil.fulfilled, (state, action) => {
        const { id } = action.payload.data;
        // immer
        const achievedDongil = state.walkingDongils!.find(
          (dongil) => dongil.id === id,
        );
        if (achievedDongil?.progressList) {
          achievedDongil.progressList[
            achievedDongil.progressList?.length - 1
          ].isAchieved = true;
        }
        state.isWalkingDongilsPatched = true;
      })
      .addCase(walkDongil.rejected, (state, action) => {
        // api 수정하는동안 일단 테스트용!!
        const { id } = action.meta.arg;
        const achievedDongil = state.walkingDongils!.find(
          (dongil) => dongil.id === id,
        );
        if (achievedDongil?.progressList) {
          achievedDongil.progressList[
            achievedDongil.progressList?.length - 1
          ].isAchieved = true;
        }
        state.isWalkingDongilsPatched = true;
      });
  },
});

export const { dispatchResetIsPatched } = walkingDongilsSlice.actions;

export const selectWalkingDongilsStatus = (state: RootState) =>
  state.walkingDongils.walkingDongilsStatus;
export const selectWalkingDongils = (state: RootState) =>
  state.walkingDongils.walkingDongils;
export const selectIsWalkingDongilsPatched = (state: RootState) =>
  state.walkingDongils.isWalkingDongilsPatched;
export default walkingDongilsSlice.reducer;
