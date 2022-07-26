import { TFetchStatus } from '@lib/types/api';
import { EMoneyRoadStatus } from '@lib/types/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';
import { IMoneyRoad } from './walkingMoneyRoadsSlice';

export type TPendingMoneyRoadsState = {
  pendingMoneyRoads: IMoneyRoad[] | null;
  pendingMoneyRoadsStatus?: TFetchStatus;
};

const initialState: TPendingMoneyRoadsState = {
  pendingMoneyRoads: [
    {
      id: 8,
      isMom: true,
      title: 'FE Mock) 아이패드 사기',
      itemName: '전자제품',
      challengeCategoryName: '이자율 받기',
      isAchieved: false,
      interestRate: 10,
      totalPrice: 150000,
      weekPrice: 10000,
      weeks: 15,
      createdAt: '2022-07-14 03:28:29',
      status: EMoneyRoadStatus.REJECTED,
      progressList: [
        {
          challengeId: 8,
          weeks: 1,
          isAchieved: false,
        },
      ],
      comment: '큰 이자를 줄만한 목표가 아닌것 같다~',
    },
  ],
  pendingMoneyRoadsStatus: 'idle',
};

// GET: 대기중인 돈길 데이터 fetch
export const fetchPendingMoneyRoads = createAsyncThunk(
  'PendingMoneyRoads/fetchPendingMoneyRoads',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/challenge/?status=pending');
    return response.data;
  },
);

export const PendingMoneyRoadsSlice = createSlice({
  name: 'PendingMoneyRoads',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPendingMoneyRoads.pending, (state) => {
        state.pendingMoneyRoadsStatus = 'loading';
      })
      .addCase(fetchPendingMoneyRoads.fulfilled, (state, action) => {
        state.pendingMoneyRoadsStatus = 'succeeded';
        state.pendingMoneyRoads = state.pendingMoneyRoads!.concat(
          action.payload.data,
        );
      })
      .addCase(fetchPendingMoneyRoads.rejected, (state, action) => {
        state.pendingMoneyRoadsStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectPendingMoneyRoadsStatus = (state: RootState) =>
  state.pendingMoneyRoads.pendingMoneyRoadsStatus;
export const selectPendingMoneyRoads = (state: RootState) =>
  state.pendingMoneyRoads.pendingMoneyRoads;
export default PendingMoneyRoadsSlice.reducer;
