import { TFetchStatus } from '@lib/types/TFetchStatus';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

export type TOverView = {
  achievedChallenge: number;
  totalChallenge: number;
  level: number;
};

export type TUser = {
  username: string;
  isFemale: boolean;
  isKid: boolean;
  birthday: string;
  phone: null;
};

export type TOverViewState = {
  user: TUser;
  overView: TOverView;
  overViewStatus?: TFetchStatus;
};

const initialState: TOverViewState = {
  user: {
    username: '',
    isFemale: true,
    isKid: false,
    birthday: '',
    phone: null,
  },
  overView: { achievedChallenge: 0, totalChallenge: 0, level: 1 },
  overViewStatus: 'idle',
};

// GET: 자녀 마이페이지 오버뷰 데이터
export const fetchOverView = createAsyncThunk(
  'overView/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/user');
    return response.data;
  },
);

export const overViewSlice = createSlice({
  name: 'overView',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOverView.pending, (state) => {
        state.overViewStatus = 'loading';
      })
      .addCase(fetchOverView.fulfilled, (state, action) => {
        state.overViewStatus = 'succeeded';
        state.overView = action.payload.data.kid;
        state.user = action.payload.data.user;
      })
      .addCase(fetchOverView.rejected, (state, action) => {
        state.overViewStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectOverViewStatus = (state: RootState) =>
  state.overView.overViewStatus;
export const selectKidOverView = (state: RootState) => state.overView.overView;
export const selectUserOverView = (state: RootState) => state.overView.user;
export default overViewSlice.reducer;
