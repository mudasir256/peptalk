import { AuthState, AuthenticationPayload, AuthenticationState } from "./types"
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: AuthenticationState = {
  user: undefined,
  authState: AuthState.NotAuthenticated,
  token: undefined
}

const authenticationSlice = createSlice({
  name: 'authenticationSlice',
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<AuthenticationPayload>) {    
      const { payload: { user = undefined, authState = AuthState.NotAuthenticated } = {} } = action || {}
      state.user = user
      state.authState = authState
    }
  }
})

const {actions, reducer} = authenticationSlice
export const {
  setAuthenticated
} = actions
export const authReducer = reducer