import { TFetchStatus } from '@lib/types/TFetchStatus';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';
import { IDongil } from '@lib/types/IDongil';

type TWalkingDongilsState = {
  walkingDongils: IDongil[];
  walkingDongilsStatus?: TFetchStatus;
  isWalkingDongilsPatched: boolean;
};

const initialState: TWalkingDongilsState = {
  walkingDongils: [],
  walkingDongilsStatus: 'idle',
  isWalkingDongilsPatched: false,
};

// GET: 걷고있는 돈길 조회
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
    return response.data;
  },
);

// PATCH: 돈길 걷기
export const walkDongil = createAsyncThunk(
  'walkingDongils/walk',
  async (thunkPayload: { axiosPrivate: AxiosInstance; id: number }) => {
    const { axiosPrivate, id } = thunkPayload;
    const response = await axiosPrivate.patch(`/progress/${id}`);
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
    // TODO: demo day
    dispatchSetPatched(state, action) {
      const id = action.payload.id;
      const achievedDongil = state.walkingDongils!.find(
        (dongil) => dongil.id === id,
      );
      if (achievedDongil?.progressList) {
        achievedDongil.progressList[
          achievedDongil.progressList?.length - 1
        ].isAchieved = true;
      }
      state.isWalkingDongilsPatched = true;
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

export const { dispatchResetIsPatched, dispatchSetPatched } =
  walkingDongilsSlice.actions;

export const selectWalkingDongilsStatus = (state: RootState) =>
  state.walkingDongils.walkingDongilsStatus;
export const selectWalkingDongils = (state: RootState) =>
  state.walkingDongils.walkingDongils;
export const selectIsWalkingDongilsPatched = (state: RootState) =>
  state.walkingDongils.isWalkingDongilsPatched;

export default walkingDongilsSlice.reducer;
