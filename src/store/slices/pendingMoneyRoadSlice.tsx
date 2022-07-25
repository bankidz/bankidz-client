import { TFetchStatus } from '@lib/types/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';
import { IMoneyRoad } from './walkingMoneyRoadSlice';

export type TPendingMoneyRoadState = {
  pendingMoneyRoad: IMoneyRoad[];
  pendingMoneyRoadStatus?: TFetchStatus;
};

const initialState: TPendingMoneyRoadState = {
  pendingMoneyRoad: [
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
  pendingMoneyRoadStatus: 'idle',
};

// GET: 대기중인 돈길 데이터 fetch
export const fetchPendingMoneyRoad = createAsyncThunk(
  'PendingMoneyRoad/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/challenge/?status=pending');
    console.log(response.data);
    return response.data;
  },
);

export const PendingMoneyRoadSlice = createSlice({
  name: 'PendingMoneyRoad',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPendingMoneyRoad.pending, (state) => {
        state.pendingMoneyRoadStatus = 'loading';
      })
      .addCase(fetchPendingMoneyRoad.fulfilled, (state, action) => {
        state.pendingMoneyRoadStatus = 'succeeded';
        state.pendingMoneyRoad.concat(action.payload.data);
      })
      .addCase(fetchPendingMoneyRoad.rejected, (state, action) => {
        state.pendingMoneyRoadStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectPendingMoneyRoadStatus = (state: RootState) =>
  state.pendingMoneyRoad.pendingMoneyRoadStatus;
export const selectPendingMoneyRoad = (state: RootState) =>
  state.pendingMoneyRoad.pendingMoneyRoad;
export default PendingMoneyRoadSlice.reducer;
