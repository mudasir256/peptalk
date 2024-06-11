import { LoginStackRoutes, HomeStackRoutes, CameraStackRoutes,  FolderStackRoutes } from "./routes";

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
  [CameraStackRoutes.VideoScreen]: { video: string };
  [CameraStackRoutes.EditVideo]: { video: string };
  [FolderStackRoutes.Folder]: undefined
  [FolderStackRoutes.FolderItems]:{ foldername: string };

};
export type AppStackParamsList = LoginStackParamsList &
  HomeStackParamsList;
