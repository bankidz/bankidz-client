import { TRequestStatus } from '@lib/types/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';
import { IMoneyRoad } from './walkingMoneyRoadSlice';

export type TWaitingMoneyRoadState = {
  waitingMoneyRoad: IMoneyRoad[];
  waitingMoneyRoadRequestStatus?: TRequestStatus;
};

const initialState: TWaitingMoneyRoadState = {
  waitingMoneyRoad: [
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
  waitingMoneyRoadRequestStatus: 'idle',
};

// GET: 대기중인 돈길 데이터 fetch
export const fetchWaitingMoneyRoad = createAsyncThunk(
  'waitingMoneyRoad/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/challenge/?status=pending');
    console.log(response.data);
    return response.data;
  },
);

export const WaitingMoneyRoadSlice = createSlice({
  name: 'WaitingMoneyRoad',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWaitingMoneyRoad.pending, (state) => {
        state.waitingMoneyRoadRequestStatus = 'loading';
      })
      .addCase(fetchWaitingMoneyRoad.fulfilled, (state, action) => {
        state.waitingMoneyRoadRequestStatus = 'succeeded';
        state.waitingMoneyRoad.concat(action.payload.data);
      })
      .addCase(fetchWaitingMoneyRoad.rejected, (state, action) => {
        state.waitingMoneyRoadRequestStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectWaitingMoneyRoadRequestStatus = (state: RootState) =>
  state.waitingMoneyRoad.waitingMoneyRoadRequestStatus;
export const selectWaitingMoneyRoad = (state: RootState) =>
  state.waitingMoneyRoad.waitingMoneyRoad;
export default WaitingMoneyRoadSlice.reducer;
