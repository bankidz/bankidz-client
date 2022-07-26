import { TFetchStatus } from '@lib/types/api';
import {
  TChallengeCategory,
  TInterestRate,
  TMoneyRoadStatus,
} from '@lib/types/common';
import { TItemName } from '@lib/types/kid';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

export interface IMoneyRoad {
  id: number | null;
  isMom: boolean | null;
  title: string | null;
  itemName: TItemName | null;
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

export type TWalkingMoneyRoadsState = {
  walkingMoneyRoads: IMoneyRoad[] | null;
  walkingMoneyRoadsStatus?: TFetchStatus;
};

const initialState: TWalkingMoneyRoadsState = {
  walkingMoneyRoads: null,
  // [
  //   {
  //     // 배열 자체가 null인 경우 (걷고있는 돈길이 없는 경우 null을 response) 와 구분하기 위해
  //     // 배열의 초기상태의 첫번째 유일한 원소의 id를 -1로 초기화 합니다.
  //     id: 1,
  //     isMom: true,
  //     title: 'FE Mock) 아이패드 사기',
  //     itemName: '전자제품',
  //     challengeCategoryName: '이자율 받기',
  //     isAchieved: false,
  //     interestRate: 10,
  //     totalPrice: 150000,
  //     weekPrice: 10000,
  //     weeks: 15,
  //     createdAt: '2022-07-14 03:28:29',
  //     status: 2,
  //     progressList: [
  //       {
  //         challengeId: 8,
  //         weeks: 1,
  //         isAchieved: false,
  //       },
  //     ],
  //     comment: null,
  //   },
  // ],
  walkingMoneyRoadsStatus: 'idle',
};

// GET: 걷고있는 돈길 데이터 fetch
export const fetchWalkingMoneyRoads = createAsyncThunk(
  'walkingMoneyRoads/fetchWalkingMoneyRoads',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/challenge/?status=accept');
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
      });
  },
});

export const selectWalkingMoneyRoadsStatus = (state: RootState) =>
  state.walkingMoneyRoads.walkingMoneyRoadsStatus;
export const selectWalkingMoneyRoads = (state: RootState) =>
  state.walkingMoneyRoads.walkingMoneyRoads;
export default walkingMoneyRoadsSlice.reducer;
