import { TFetchStatus } from '@lib/types/TFetchStatus';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    const response = await axiosPrivate.get('/challenge/?status=walking');
    return response.data;
  },
);

// DELETE: 걷고있는 돈길 삭제
export const deleteWalkingDongil = createAsyncThunk(
  'walkingDongils/delete',
  async (
    thunkPayload: { axiosPrivate: AxiosInstance; id: number },
    { rejectWithValue },
  ) => {
    const { axiosPrivate, id } = thunkPayload;
    try {
      const response = await axiosPrivate.delete(`/challenge/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
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
    // 걷고있는 돈길 상세 페이지(/Detail)에서 돈길 포기하기 시 Client Side의 걷고 있는 돈길은
    // 바로 삭제 되는것이 아닌 '돈길이 포기되었어요' 바텀시트 확인 버튼 클릭 시 삭제되도록함
    // Client Side와 Server Side 삭제 로직을 분리하였음
    deleteClientSideWalkingDongilById: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.walkingDongils = state.walkingDongils!.filter(
        (walkingDongil) => walkingDongil.id !== action.payload,
      );
    },
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
        console.error(action);
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

export const {
  dispatchResetIsPatched,
  dispatchSetPatched,
  deleteClientSideWalkingDongilById,
} = walkingDongilsSlice.actions;

export const selectWalkingDongilsStatus = (state: RootState) =>
  state.walkingDongils.walkingDongilsStatus;
export const selectWalkingDongils = (state: RootState) =>
  state.walkingDongils.walkingDongils;
export const selectIsWalkingDongilsPatched = (state: RootState) =>
  state.walkingDongils.isWalkingDongilsPatched;

export default walkingDongilsSlice.reducer;
