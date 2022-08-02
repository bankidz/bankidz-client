import { TFetchStatus } from '@lib/types/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';
import { IDongil } from './walkingDongilSlice';

interface IThisWeekSDongil {
  userName: string;
  isFemale: boolean;
  challengeList: IDongil[];
}

export type TThisWeekSDongilsState = {
  thisWeekSDongils: IThisWeekSDongil[] | null;
  thisWeekSDongilsStatus?: TFetchStatus;
};

const initialState: TThisWeekSDongilsState = {
  thisWeekSDongils: [
    {
      userName: '테스트1',
      isFemale: false,
      challengeList: [
        {
          id: 100,
          isMom: false,
          title: '엄마 생일선물',
          itemName: '선물',
          challengeCategory: '이자율 받기',
          isAchieved: 2,
          interestRate: 10,
          totalPrice: 50000,
          weekPrice: 8000,
          successWeeks: 0,
          weeks: 6,
          createdAt: '2022-07-27 06:30:02',
          status: 0,
          progressList: null,
          comment: null,
        },
        {
          id: 101,
          isMom: false,
          title: '엄마 생일선물',
          itemName: '선물',
          challengeCategory: '이자율 받기',
          isAchieved: 2,
          interestRate: 10,
          totalPrice: 50000,
          weekPrice: 8000,
          successWeeks: 0,
          weeks: 6,
          createdAt: '2022-07-27 06:30:02',
          status: 0,
          progressList: null,
          comment: null,
        },
      ],
    },
    {
      userName: '테스트2',
      isFemale: false,
      challengeList: [
        {
          id: 102,
          isMom: false,
          title: '엄마 생일선물',
          itemName: '선물',
          challengeCategory: '이자율 받기',
          isAchieved: 2,
          interestRate: 10,
          totalPrice: 50000,
          weekPrice: 8000,
          successWeeks: 0,
          weeks: 6,
          createdAt: '2022-07-27 06:30:02',
          status: 0,
          progressList: null,
          comment: null,
        },
        {
          id: 103,
          isMom: false,
          title: '엄마 생일선물',
          itemName: '선물',
          challengeCategory: '이자율 받기',
          isAchieved: 2,
          interestRate: 10,
          totalPrice: 50000,
          weekPrice: 8000,
          successWeeks: 0,
          weeks: 6,
          createdAt: '2022-07-27 06:30:02',
          status: 0,
          progressList: null,
          comment: null,
        },
      ],
    },
  ],
  thisWeekSDongilsStatus: 'idle',
};

// GET: 금주의 돈길 조회
export const fetchThisWeekSDongils = createAsyncThunk(
  'thisWeekSDongils/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance; kidId: number }) => {
    const { axiosPrivate, kidId } = thunkPayload;
    const response = await axiosPrivate.get(
      `/challenge/kid/${kidId}?status=accept`,
    );
    return response.data;
  },
);

export const thisWeekSDongilsSlice = createSlice({
  name: 'thisWeekSDongils',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchThisWeekSDongils.pending, (state) => {
        state.thisWeekSDongilsStatus = 'loading';
      })
      .addCase(fetchThisWeekSDongils.fulfilled, (state, action) => {
        state.thisWeekSDongilsStatus = 'succeeded';
        if (state.thisWeekSDongils === null) {
          state.thisWeekSDongils = [];
          state.thisWeekSDongils[0] = action.payload.data;
        } else {
          state.thisWeekSDongils = state.thisWeekSDongils.concat(
            action.payload.data,
          );
        }
      })
      .addCase(fetchThisWeekSDongils.rejected, (state, action) => {
        state.thisWeekSDongilsStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectThisWeekSDongilsStatus = (state: RootState) =>
  state.thisWeekSDongils.thisWeekSDongilsStatus;

export const selectThisWeekSDongils = (state: RootState) =>
  state.thisWeekSDongils.thisWeekSDongils;

export default thisWeekSDongilsSlice.reducer;
