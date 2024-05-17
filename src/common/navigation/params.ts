import { TakePhotoOptions } from './../../../node_modules/react-native-vision-camera/lib/typescript/types/PhotoFile.d';
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
  [HomeStackRoutes.Search]: undefined;
  [HomeStackRoutes.TermsOfUse]: undefined;
  [HomeStackRoutes.About]: undefined;
  [HomeStackRoutes.Contact]: undefined;
};
export type AppStackParamsList = LoginStackParamsList &
  HomeStackParamsList;
