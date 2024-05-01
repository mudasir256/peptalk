import { LoginStackRoutes, HomeStackRoutes } from "./routes";

export type LoginStackParamsList = {
    [LoginStackRoutes.Splash]: undefined;
    [LoginStackRoutes.Landing]: undefined;
    [LoginStackRoutes.Login]: undefined;
    [LoginStackRoutes.Signup]: undefined;
    [LoginStackRoutes.SignUpWithEmail]: undefined;
  };
  export type HomeStackParamsList = {
    [HomeStackRoutes.Home]: undefined;
  };
  export type AppStackParamsList = LoginStackParamsList &
  HomeStackParamsList;
