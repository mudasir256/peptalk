export enum AuthState {
  NotAuthenticated,
  Authenticating,
  Authenticated
}

export type AuthUser = {
  id: string
  name: string
  email: string
}

export type AuthenticationState = {
  authState: AuthState
  user: AuthUser
  accessToken: string
  refreshToken?:string
}

export type AuthenticationPayload = {
  user?: AuthUser
  authState: AuthState
}