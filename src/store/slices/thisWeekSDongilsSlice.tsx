import { IDongil } from '@lib/types/IDongil';
import { TFetchStatus } from '@lib/types/TFetchStatus';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

interface IThisWeekSDongil {
  userName: string;
  isFemale: boolean;
  challengeList: IDongil[];
}

type TThisWeekSDongilsState = {
  thisWeekSDongils: IThisWeekSDongil[];
  thisWeekSDongilsStatus?: TFetchStatus;
};

const initialState: TThisWeekSDongilsState = {
  thisWeekSDongils: [],
  thisWeekSDongilsStatus: 'idle',
};

// GET: 금주의 돈길 조회
export const fetchThisWeekSDongils = createAsyncThunk(
  'thisWeekSDongils/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance; kidId: number }) => {
    const { axiosPrivate, kidId } = thunkPayload;
    const response = await axiosPrivate.get(
      `/challenge/kid/${kidId}?status=walking`,
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
        console.error(action.error);
      });
  },
});

export const selectThisWeekSDongilsStatus = (state: RootState) =>
  state.thisWeekSDongils.thisWeekSDongilsStatus;

export const selectThisWeekSDongils = (state: RootState) =>
  state.thisWeekSDongils.thisWeekSDongils;

export default thisWeekSDongilsSlice.reducer;
