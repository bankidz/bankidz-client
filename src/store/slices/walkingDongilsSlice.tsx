import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';
import { IDongil } from '@lib/types/IDongil';

interface IWalkingDongilsState {
  walkingDongils: IDongil[];
  isWalkingDongilsPatched: boolean;
}

const initialState: IWalkingDongilsState = {
  walkingDongils: [],
  isWalkingDongilsPatched: false,
};

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
    builder.addCase(walkDongil.fulfilled, (state, action) => {
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

export const selectWalkingDongils = (state: RootState) =>
  state.walkingDongils.walkingDongils;
export const selectIsWalkingDongilsPatched = (state: RootState) =>
  state.walkingDongils.isWalkingDongilsPatched;

export default walkingDongilsSlice.reducer;
