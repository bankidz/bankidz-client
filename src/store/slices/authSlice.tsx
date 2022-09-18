import { RootState } from '../app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TLevel } from '@lib/types/TLevel';

interface IAuth {
  accessToken: string;
  isKid: boolean | null;
  level: TLevel | null;
  provider: string;
  birthday: string;
}

interface IAuthState {
  auth: IAuth;
}

const initialState: IAuthState = {
  auth: {
    accessToken: '', // TODO: delete
    isKid: null,
    level: null,
    provider: '',
    birthday: '',
  },
};

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
      state.auth.birthday = '';
    },
    setBirthday: (state, action: PayloadAction<string>) => {
      state.auth.birthday = action.payload;
    },
    assignIsKid: (state, action: PayloadAction<boolean>) => {
      state.auth.isKid = action.payload;
    },
    setLevel: (state, action: PayloadAction<TLevel>) => {
      state.auth.level = action.payload;
    },
  },
});

export const {
  setCredentials,
  resetCredentials,
  assignIsKid,
  setBirthday,
  setLevel,
} = authSlice.actions;

export const selectIsKid = (state: RootState) => state.auth.auth.isKid;
export const selectLevel = (state: RootState) => state.auth.auth.level;
export const selectBirthday = (state: RootState) => state.auth.auth.birthday;
export const selectProvider = (state: RootState) => state.auth.auth.provider;

export default authSlice.reducer;

// https://stackoverflow.com/questions/63439021/handling-errors-with-redux-toolkit
// https://redux-toolkit.js.org/api/createAsyncThunk
