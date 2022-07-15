import { axiosPublic } from '@lib/api/axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import axios from 'axios';

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
    isRegistered: false,
    isKid: false,
  },
  status: 'idle',
  error: undefined,
};

// POST: 뱅키즈 서버로 인가코드 전송
export const login = createAsyncThunk(
  'auth/login',
  async (code: { code: string | null }) => {
    try {
      console.log(`in login thunk code: ${JSON.stringify(code)}`);
      // const response = await axiosPublic.get('/health');
      const response = await axiosPublic.post('/kakao/login', code);
      console.log(`in login thunk response: ${JSON.stringify(response.data)}`);
      // return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.message;
      }
    }
  },
);

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
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      // console.log(action.payload);
      // const { accessToken, isRegistered } = action.payload?.data; // TODO: isRegister boolean으로 변환
      // state.auth.accessToken = accessToken;
      // state.auth.isRegistered = isRegistered;
    });
    // builder.addCase(setProfile.fulfilled, (state, action) => {
    //   console.log(action.payload);
    // });
  },
});

export const {} = authSlice.actions;

export const selectAccessToken = (state: RootState) =>
  state.auth.auth.accessToken;
export const selectIsRegistered = (state: RootState) =>
  state.auth.auth.isRegistered;
export const selectIsKid = (state: RootState) => state.auth.auth.isKid;
export const selectAuthStatus = (state: RootState) => state.auth.status;

export default authSlice.reducer;

// https://github.com/gitdagray/redux_jwt_auth/blob/main/src/features/auth/authSlice.js
// https://github.com/Neogasogaeseo/Naega-Web/blob/dev/src/presentation/pages/OAuthRedirectHandler/index.tsx
// https://bobbyhadz.com/blog/typescript-left-hand-side-of-assignment-not-optional
// https://kyounghwan01.github.io/blog/TS/object-null/#%E1%84%8B%E1%85%A8%E1%84%89%E1%85%B5
// https://stackoverflow.com/questions/61339968/error-message-devtools-failed-to-load-sourcemap-could-not-load-content-for-chr
// https://velog.io/@lieblichoi/%ED%81%AC%EB%A1%ACChrome-DevTools-failed-to-load-source-map-Could-not-load-content-for-%EC%88%A8%EA%B8%B0%EA%B8%B0
