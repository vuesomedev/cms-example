import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from '../../services/auth-api.service';
import { RootState } from '../store';

export interface AuthState {
  loggedIn: boolean;
  id: number;
  username: string;
  email: string;
  roles: string[];
  token: string;
  failedLogins: number;
}

const initialState: AuthState = {
  loggedIn: false,
  id: 0,
  username: '',
  email: '',
  roles: [],
  token: '',
  failedLogins: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginResponse>) => {
      state.loggedIn = true;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.roles = action.payload.roles;
      state.token = action.payload.token;
    },
    failedLogin: (state) => {
      state.failedLogins++;
    },
    resetFailedLogins: (state) => {
      state.failedLogins = 0;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.id = 0;
      state.username = '';
      state.email = '';
      state.roles = [];
      state.token = '';
    },
  },
});

export const isLoggedInSelector = (state: RootState) => state.auth.loggedIn;
export const isAdminSelector = (state: RootState) =>
  isLoggedInSelector(state) && state.auth.roles.includes('administrator');
export const isEditorSelector = (state: RootState) =>
  isLoggedInSelector(state) && state.auth.roles.includes('content_editor');
export const isSignedInSelector = (state: RootState) =>
  isLoggedInSelector(state) && state.auth.roles.includes('signed_in');

export const { logout, login, failedLogin, resetFailedLogins } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
