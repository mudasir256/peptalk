import { LoginStackRoutes, HomeStackRoutes, CameraStackRoutes,  FolderStackRoutes } from "./routes";

export type LoginStackParamsList = {
  [LoginStackRoutes.Splash]: undefined;
  [LoginStackRoutes.Landing]: undefined;
  [LoginStackRoutes.Login]: undefined;
  [LoginStackRoutes.Signup]: undefined;
  [LoginStackRoutes.SignUpWithEmail]: undefined;
  [LoginStackRoutes.ForgotPassword]: undefined;
};
export type HomeStackParamsList = {
  [HomeStackRoutes.Home]: undefined;
  [HomeStackRoutes.Search]: undefined;
  [HomeStackRoutes.TermsOfUse]: undefined;
  [HomeStackRoutes.About]: undefined;
  [HomeStackRoutes.Password]: undefined;
  [HomeStackRoutes.ResetPasswordWithEmail]: undefined;
  [HomeStackRoutes.Contact]: undefined;
  [HomeStackRoutes.MediaScreen]: undefined;
  [CameraStackRoutes.VideoScreen]: { video: string,fileUri:string };
  [CameraStackRoutes.EditVideo]: { video: string };
  [FolderStackRoutes.Folder]: undefined
  [FolderStackRoutes.FolderItems]:{ foldername: string, folderId?: number };

};
export type AppStackParamsList = LoginStackParamsList &
  HomeStackParamsList;
