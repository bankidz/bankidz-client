import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { axiosPublic } from '../../lib/api/axios';
import { RootState } from '../app/store';

export type TReduxStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

type TAuthState = {
  auth: {
    accessToken: string | null;
    isRegistered: boolean | null;
    isKid: boolean | null;
  };
  status: TReduxStatus;
  error: string | undefined;
};

const initialState: TAuthState = {
  auth: {
    accessToken: null,
    isRegistered: null,
    isKid: false,
  },
  status: 'idle',
  error: undefined,
};

// POST: 뱅키즈 서버로 인가코드 전송
/* export const login = createAsyncThunk('auth/login', async (code: any) => {
  try {
    console.log(`in login thunk code: ${JSON.stringify(code)}`);
    const response = await axiosPublic.post('/login', code);
    console.log(`in login thunk response: ${response}`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.message;
    }
  }
}); */

// POST: 프로필 정보가 없는 회원에 대해 입력받은 프로필 정보 전송
/* export const setProfile = createAsyncThunk(
  'auth/setProfile',
  async (profile: any) => {
    try {
      console.log(`in setProfile thunk code: ${JSON.stringify(profile)}`);
      const response = await axiosPublic.post('/set/profile', profile);
      console.log(`in setProfile thunk response: ${response}`);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.message;
      }
    }
  },
); */

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  /* extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log(action.payload);
      // const { accessToken, isRegistered } = action.payload?.data; // TODO: isRegister boolean으로 변환
      // state.auth.accessToken = accessToken;
      // state.auth.isRegistered = isRegistered;
    });
    builder.addCase(setProfile.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  }, */
});

export const {} = authSlice.actions;

export const selectAccessToken = (state: RootState) =>
  state.auth.auth.accessToken;
export const selectIsRegistered = (state: RootState) =>
  state.auth.auth.isRegistered;
export const selectIsKid = (state: RootState) => state.auth.auth.isKid;
export const selectAuthStatus = (state: RootState) => state.auth.status;

export default authSlice.reducer;
