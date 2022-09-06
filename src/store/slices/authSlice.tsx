import { axiosPublic } from '@apis/axios';
import { TLevel } from '@lib/types/TLevel';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

interface IAuth {
  accessToken: string;
  isKid: boolean | null;
  level: TLevel | null;
  provider: string;
  birthday: string;
  username: string;
  isFemale: boolean | null;
  phone: string | null;
}

interface IAuthState {
  auth: IAuth;
}

// https://api.bankidz.com, https://bankids.click Role 통일
// 아빠(신성우): eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjYxNDM1MTg5LCJzdWIiOiI1IiwiZXhwIjoxNjYzODU0Mzg5LCJpZCI6NSwicm9sZXMiOiJVU0VSIn0.SyPHLiGa68dGG7iYfo1_k-HRUiL80K0Gk03D0GVQrzI
// 엄마(김민준): eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjYxNDEzMTU3LCJzdWIiOiIyIiwiZXhwIjoxNjYzODMyMzU3LCJpZCI6Miwicm9sZXMiOiJVU0VSIn0.Cd01Ev34qZ8bKlpdtke3sNRRzXm2csyp3M_7rbyqYkE
// 아들(한규진): eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjYxNDQwMjUxLCJzdWIiOiI0IiwiZXhwIjoxNjYzODU5NDUxLCJpZCI6NCwicm9sZXMiOiJVU0VSIn0.uqkdNdiIhz5Aix1mY-wx2TIYM2DS8pPqNPNNqrTe7lg
// 딸(주어진): eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjYxNDIyMDMyLCJzdWIiOiIzIiwiZXhwIjoxNjYzODQxMjMyLCJpZCI6Mywicm9sZXMiOiJVU0VSIn0.aFmub0vNB49WST48bN5ryh61Lqrxg6umhU0I351xjdA

const initialState: IAuthState = {
  auth: {
    accessToken:
      ' eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjYxNDIyMDMyLCJzdWIiOiIzIiwiZXhwIjoxNjYzODQxMjMyLCJpZCI6Mywicm9sZXMiOiJVU0VSIn0.aFmub0vNB49WST48bN5ryh61Lqrxg6umhU0I351xjdA',
    isKid: true,
    level: 4,
    provider: '',
    birthday: '',
    username: '',
    isFemale: null,
    phone: null,
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

interface IRegisterThunkPayload
  extends Pick<IAuth, 'birthday' | 'isFemale' | 'isKid'> {
  axiosPrivate: AxiosInstance;
}

// PATCH: 생년월일과 역할 정보가 없는 회원에 대해 입력받은 정보를 서버로 전송
export const register = createAsyncThunk(
  'auth/register',
  async (thunkPayload: IRegisterThunkPayload) => {
    const { axiosPrivate, birthday, isFemale, isKid } = thunkPayload;
    const response = await axiosPrivate.patch('/user', {
      birthday,
      isFemale,
      isKid,
    });
    return response.data;
  },
);

interface ICredentials
  extends Pick<IAuth, 'accessToken' | 'isKid' | 'level' | 'provider'> {}

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
    setBirthday: (state, action: PayloadAction<string>) => {
      state.auth.birthday = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, isKid, level, provider } = action.payload.data;
        state.auth.accessToken = accessToken;
        state.auth.isKid = isKid;
        state.auth.level = level;
        state.auth.provider = provider;
      })
      .addCase(register.fulfilled, (state, action) => {
        const { birthday, isFemale, isKid, phone, username } =
          action.payload.data;
        state.auth.birthday = birthday;
        state.auth.isFemale = isFemale;
        state.auth.isKid = isKid;
        state.auth.phone = phone;
        state.auth.username = username;
      });
  },
});

export const { setCredentials, resetCredentials, setBirthday } =
  authSlice.actions;

export const selectAuth = (state: RootState) => state.auth.auth;
export const selectAccessToken = (state: RootState) =>
  state.auth.auth.accessToken;
export const selectIsKid = (state: RootState) => state.auth.auth.isKid;
export const selectLevel = (state: RootState) => state.auth.auth.level;
export const selectBirthday = (state: RootState) => state.auth.auth.birthday;
export const selectProvider = (state: RootState) => state.auth.auth.provider;

export default authSlice.reducer;

// https://stackoverflow.com/questions/63439021/handling-errors-with-redux-toolkit
// https://redux-toolkit.js.org/api/createAsyncThunk
