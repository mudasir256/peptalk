import { AppStackParamsList } from "./params";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamsList {}
  }
}

export {};
