import AsyncStorage from "@react-native-async-storage/async-storage"
import { AuthState, AuthenticationPayload, AuthenticationState } from "./types"
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist';

const initialState: AuthenticationState = {
  user: undefined,
  authState: AuthState.NotAuthenticated,
  accessToken: undefined,
  refreshToken:undefined
}
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: [],
}

const authenticationSlice = createSlice({
  name: 'authenticationSlice',
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{
        accessToken: string | null;
        refreshToken?: string | null;
      }>
    ) => {
      const { accessToken,refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    setAuthenticated(state, action: PayloadAction<AuthenticationPayload>) {    
      const { payload: { user = undefined, authState = AuthState.NotAuthenticated } = {} } = action || {}
      state.user = user
      state.authState = authState
    },
    logoutAction(state) {
      state.user = undefined
      state.authState = AuthState.NotAuthenticated,
      state.accessToken = undefined
      state.refreshToken = undefined
    }
  }
})

const {actions} = authenticationSlice
export const {
  setAuthenticated,
  setToken,
  logoutAction,
} = actions
export const authReducer = persistReducer(persistConfig, authenticationSlice.reducer);
