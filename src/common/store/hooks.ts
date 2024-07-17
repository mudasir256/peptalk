import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/*
const useAuthSlice = () => useAppSelector((store) => store.authentication);
const useUser = () => useAppSelector((store) => store.authentication.user);
const useAccessToken = useAppSelector(
  (store) => store.authentication.accessToken
);
*/

//export { useAuthSlice, useUser, useAccessToken };
