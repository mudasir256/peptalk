import { RootState } from "./store";

export const selectAuthenticationState = (state: RootState) => state.authentication
export const selectAuthState = (state: RootState) => state.authentication.authState