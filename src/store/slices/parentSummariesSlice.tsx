import { TFetchStatus } from '@lib/types/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

interface IParentSummary {
  kidId: number;
  weekInfo: {
    currentSavings: number;
    totalPrice: number;
  };
}

export type TParentSummariesState = {
  parentSummaries: IParentSummary[] | null;
  parentSummariesStatus?: TFetchStatus;
};

const initialState: TParentSummariesState = {
  parentSummaries: null,
  parentSummariesStatus: 'idle',
};

// GET: 부모 홈 페이지 Summary 데이터 조회
export const fetchParentSummaries = createAsyncThunk(
  'parentSummaries/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance; kidId: number }) => {
    const { axiosPrivate, kidId } = thunkPayload;
    const response = await axiosPrivate.get(`/challenge/kid/progress/${kidId}`);
    return response.data;
  },
);

export const parentSummariesSlice = createSlice({
  name: 'parentSummaries',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchParentSummaries.pending, (state) => {
        state.parentSummariesStatus = 'loading';
      })
      .addCase(fetchParentSummaries.fulfilled, (state, action) => {
        state.parentSummariesStatus = 'succeeded';
        if (state.parentSummaries === null) {
          state.parentSummaries = [];
          state.parentSummaries[0] = action.payload.data;
        } else {
          state.parentSummaries = state.parentSummaries.concat(
            action.payload.data,
          );
        }
      })
      .addCase(fetchParentSummaries.rejected, (state, action) => {
        state.parentSummariesStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectParentSummariesStatus = (state: RootState) =>
  state.parentSummaries.parentSummariesStatus;

export const selectParentSummaries = (state: RootState) =>
  state.parentSummaries.parentSummaries;

export default parentSummariesSlice.reducer;
