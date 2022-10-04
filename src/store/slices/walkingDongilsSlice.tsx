import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface IWalkingDongilsState {
  isWalkingDongilsPatched: boolean;
}

const initialState: IWalkingDongilsState = {
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

export const selectIsWalkingDongilsPatched = (state: RootState) =>
  state.walkingDongils.isWalkingDongilsPatched;

export default walkingDongilsSlice.reducer;
