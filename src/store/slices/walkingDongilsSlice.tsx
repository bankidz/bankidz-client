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

export const walkingDongilsSlice = createSlice({
  name: 'walkingDongils',
  initialState,
  reducers: {
    resetDongilPatched(state) {
      state.isWalkingDongilsPatched = false;
    },
    setDongilPatched(state) {
      state.isWalkingDongilsPatched = true;
    },
  },
});

export const { resetDongilPatched, setDongilPatched } =
  walkingDongilsSlice.actions;

export const selectWalkingDongils = (state: RootState) =>
  state.walkingDongils.walkingDongils;
export const selectIsWalkingDongilsPatched = (state: RootState) =>
  state.walkingDongils.isWalkingDongilsPatched;

export default walkingDongilsSlice.reducer;
