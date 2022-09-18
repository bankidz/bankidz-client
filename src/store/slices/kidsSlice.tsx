import { IKidListDTO } from '@lib/apis/family/familyDTO';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface IKidsState {
  // 부모 홈에서 다자녀중 선택된 한명의 자녀
  selectedKid: IKidListDTO | null;
  // 다자녀 유무
  hasMultipleKids: boolean;
}

const initialState: IKidsState = {
  selectedKid: null,
  hasMultipleKids: false,
};

export const kidsSlice = createSlice({
  name: 'kids',
  initialState,
  reducers: {
    setSelectedKid: (state, action: PayloadAction<IKidListDTO>) => {
      state.selectedKid = action.payload;
    },
    setHasMultipleKids: (state, action: PayloadAction<boolean>) => {
      state.hasMultipleKids = action.payload;
    },
  },
});

export const { setSelectedKid, setHasMultipleKids } = kidsSlice.actions;

export const selectSelectedKid = (state: RootState) => state.kids.selectedKid;
export const selectHasMultipleKids = (state: RootState) =>
  state.kids.hasMultipleKids;

export default kidsSlice.reducer;
