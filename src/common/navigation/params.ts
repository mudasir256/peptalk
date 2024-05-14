import { LoginStackRoutes, HomeStackRoutes, SearchStackRoutes } from "./routes";

export type LoginStackParamsList = {
  [LoginStackRoutes.Splash]: undefined;
  [LoginStackRoutes.Landing]: undefined;
  [LoginStackRoutes.Login]: undefined;
  [LoginStackRoutes.Signup]: undefined;
  [LoginStackRoutes.SignUpWithEmail]: undefined;
};
export type HomeStackParamsList = {
  [HomeStackRoutes.Home]: undefined;
  [HomeStackRoutes.Search]: undefined;
};
export type AppStackParamsList = LoginStackParamsList &
  HomeStackParamsList;
