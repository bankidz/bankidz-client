import { axiosPublic } from '@lib/api/axios';
import { TRequestStatus } from '@lib/types/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

export type TAuthState = {
  auth: {
    accessToken: string | null;
    isKid: boolean | null;
    level: 1 | 2 | 3 | 4 | 5 | null;
    isFemale: boolean | null;
    birthday: string | null;
    username: string | null;
    phone: string | null;
  };
  authRequestStatus: TRequestStatus;
};

// 김원진: 규진의 엄마
const initialState: TAuthState = {
  auth: {
    accessToken:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjU4MDM1ODc2LCJzdWIiOiIyIiwiZXhwIjoxNjYwNDU1MDc2LCJpZCI6Miwicm9sZXMiOiJVU0VSIn0.KXzamQgcDWrLw3MAkPzewQI_hK9NCzGa3z8GcLeH-p8',
    // accessToken: null,
    // isKid: true,
    isKid: false,
    level: null,
    isFemale: null,
    birthday: null,
    username: null,
    phone: null,
  },
  authRequestStatus: 'idle', // for GET method
};

// POST: 카카오 서버로부터 받은 인증코드를 뱅키즈 서버로 전송
export const login = createAsyncThunk(
  'auth/login',
  async (thunkPayload: { code: string | null }) => {
    const { code } = thunkPayload;
    const response = await axiosPublic.post('/kakao/login', {
      code,
    });
    return response.data;
  },
);

// PATCH: 생년월일과 역할 정보가 없는 회원에 대해 입력받은 정보를 서버로 전송
export const register = createAsyncThunk(
  'auth/register',
  async (thunkPayload: {
    axiosPrivate: AxiosInstance;
    birthday: string | null;
    isKid: boolean | null;
    isFemale: boolean | null;
  }) => {
    const { axiosPrivate, birthday, isKid, isFemale } = thunkPayload;
    const response = await axiosPrivate.patch('/user', {
      birthday,
      isKid,
      isFemale,
    });
    return response.data;
  },
);

export interface IAuth {
  accessToken: string | null;
  isKid: boolean | null;
  level: 1 | 2 | 3 | 4 | 5 | null;
}

export interface IBirthDay {
  birthday: string;
}

export interface IRole {
  isKid: boolean;
  isFemale: boolean;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IAuth>) => {
      const { accessToken, isKid, level } = action.payload;
      state.auth.accessToken = accessToken;
      state.auth.isKid = isKid;
      state.auth.level = level;
    },
    resetCredentials: (state) => {
      state.auth.accessToken = null;
      state.auth.isKid = null;
      state.auth.level = null;
    },
    setBirthday: (state, action: PayloadAction<IBirthDay>) => {
      const { birthday } = action.payload;
      state.auth.birthday = birthday;
    },
    setRole: (state, action: PayloadAction<IRole>) => {
      const { isKid, isFemale } = action.payload;
      state.auth.isKid = isKid;
      state.auth.isFemale = isFemale;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, isKid } = action.payload.data;
        state.auth.accessToken = accessToken;
        state.auth.isKid = isKid;
      })
      .addCase(register.fulfilled, (state, action) => {
        const { username, isFemale, isKid, birthday, phone } =
          action.payload.data;
        state.auth.accessToken = username;
        state.auth.isFemale = isFemale;
        state.auth.isKid = isKid;
        state.auth.birthday = birthday;
        state.auth.phone = phone;
      });
  },
});

export const { setCredentials, resetCredentials, setBirthday, setRole } =
  authSlice.actions;

export const selectAccessToken = (state: RootState) =>
  state.auth.auth.accessToken;
export const selectIsKid = (state: RootState) => state.auth.auth.isKid;
export const selectIsFemale = (state: RootState) => state.auth.auth.isFemale;
export const selectBirthday = (state: RootState) => state.auth.auth.birthday;

export default authSlice.reducer;

// const response = await axiosPublic.get('/health');
// console.log(response.data);
