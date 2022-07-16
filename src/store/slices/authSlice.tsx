import { axiosPublic } from '@lib/api/axios';
import { TReduxStatus } from '@lib/types/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

type TAuthState = {
  auth: {
    accessToken: string | null;
    isKid: boolean | null;
  };
  status: TReduxStatus;
  error: string | undefined;
};

const initialState: TAuthState = {
  auth: {
    accessToken: null,
    // TODO: init isKid
    isKid: true,
  },
  status: 'idle',
  error: undefined,
};

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

interface IAuth {
  accessToken: string | null;
  isKid: boolean | null;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IAuth>) => {
      state.auth.accessToken = action.payload.accessToken;
      state.auth.isKid = action.payload.isKid;
    },
    resetCredentials: (state) => {
      state.auth.accessToken = null;
      state.auth.isKid = null;
    },
  },
});

export const { setCredentials, resetCredentials } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth.auth;
export const selectAccessToken = (state: RootState) =>
  state.auth.auth.accessToken;
export const selectIsKid = (state: RootState) => state.auth.auth.isKid;

export default authSlice.reducer;

// https://github.com/gitdagray/redux_jwt_auth/blob/main/src/features/auth/authSlice.js
// https://github.com/Neogasogaeseo/Naega-Web/blob/dev/src/presentation/pages/OAuthRedirectHandler/index.tsx
// https://bobbyhadz.com/blog/typescript-left-hand-side-of-assignment-not-optional
// https://kyounghwan01.github.io/blog/TS/object-null/#%E1%84%8B%E1%85%A8%E1%84%89%E1%85%B5
// https://stackoverflow.com/questions/61339968/error-message-devtools-failed-to-load-sourcemap-could-not-load-content-for-chr
// https://velog.io/@lieblichoi/%ED%81%AC%EB%A1%ACChrome-DevTools-failed-to-load-source-map-Could-not-load-content-for-%EC%88%A8%EA%B8%B0%EA%B8%B0
