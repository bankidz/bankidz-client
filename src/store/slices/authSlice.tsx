import { RootState } from '../app/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { axiosPrivateTemp, axiosPublic } from '@apis/axios';
import { TLevel } from '@lib/types/TLevel';
import setLocalStorage from '@lib/utils/localStorage/setLocalStorage';

interface IAuth {
  accessToken: string;
  isKid: boolean | null;
  level: TLevel | null;
  provider: string;
  birthday: string;
  username: string;
  isFemale: boolean | null;
  phone: string | null;
  withdrawReason: string;
}

interface IAuthState {
  auth: IAuth;
}

const initialState: IAuthState = {
  auth: {
    accessToken: '',
    isKid: null,
    level: null,
    provider: '',
    birthday: '',
    username: '',
    isFemale: null,
    phone: null,
    withdrawReason: '',
  },
};

// POST: 카카오 서버로부터 받은 인증코드를 뱅키즈 서버로 전송
export const login = createAsyncThunk(
  'auth/login',
  async (thunkPayload: { code: string }) => {
    const { code } = thunkPayload;
    const response = await axiosPublic.post('/kakao/login', {
      code,
    });
    return response.data;
  },
);

// PATCH: 재접속 시 자동로그인 처리
export const persistLogin = createAsyncThunk('auth/persistLogin', async () => {
  const response = await axiosPrivateTemp.patch('/user/refresh');
  return response.data;
});

interface ICredentials
  extends Pick<IAuth, 'accessToken' | 'isKid' | 'level' | 'provider'> {}

interface IProfile
  extends Pick<
    IAuth,
    'username' | 'isFemale' | 'isKid' | 'birthday' | 'phone'
  > {}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<ICredentials>) => {
      const { accessToken, isKid, level, provider } = action.payload;
      state.auth.accessToken = accessToken;
      state.auth.isKid = isKid;
      state.auth.level = level;
      state.auth.provider = provider;
    },
    resetCredentials: (state) => {
      state.auth.accessToken = '';
      state.auth.isKid = null;
      state.auth.level = null;
      state.auth.provider = '';
    },
    setProfile: (state, action: PayloadAction<IProfile>) => {
      const { username, isFemale, isKid, birthday, phone } = action.payload;
      state.auth.username = username;
      state.auth.isFemale = isFemale;
      state.auth.isKid = isKid;
      state.auth.birthday = birthday;
      state.auth.phone = phone;
    },
    setBirthday: (state, action: PayloadAction<string>) => {
      state.auth.birthday = action.payload;
    },
    setLevel: (state, action: PayloadAction<TLevel>) => {
      state.auth.level = action.payload;
    },
    setWithdrawReason: (state, action: PayloadAction<string>) => {
      state.auth.withdrawReason = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, isKid, level, provider } = action.payload.data;
        setLocalStorage('accessToken', accessToken);
        state.auth.accessToken = accessToken;
        state.auth.isKid = isKid;
        state.auth.level = level;
        state.auth.provider = provider;
      })
      .addCase(persistLogin.fulfilled, (state, action) => {
        const { accessToken, isKid, level, provider } = action.payload;
        setLocalStorage('accessToken', accessToken);
        state.auth.accessToken = accessToken;
        state.auth.isKid = isKid;
        state.auth.level = level;
        state.auth.provider = provider;
      });
  },
});

export const {
  setCredentials,
  resetCredentials,
  setProfile,
  setBirthday,
  setLevel,
  setWithdrawReason,
} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth.auth;
export const selectAccessToken = (state: RootState) =>
  state.auth.auth.accessToken;
export const selectIsKid = (state: RootState) => state.auth.auth.isKid;
export const selectLevel = (state: RootState) => state.auth.auth.level;
export const selectBirthday = (state: RootState) => state.auth.auth.birthday;
export const selectProvider = (state: RootState) => state.auth.auth.provider;
export const selectWithdrawReason = (state: RootState) =>
  state.auth.auth.withdrawReason;

export default authSlice.reducer;

// https://stackoverflow.com/questions/63439021/handling-errors-with-redux-toolkit
// https://redux-toolkit.js.org/api/createAsyncThunk
