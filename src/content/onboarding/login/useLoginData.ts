import Toast from "react-native-toast-message";
import { useLoginMutation } from "../../../common/store/slice/api/slice";
import { useAppDispatch } from "../../../common/store";
import {  setAuthenticated, setToken } from "../../../common/store/slice/authentication/slice";
import { AuthState } from "../../../common/store/slice/authentication/types";
import { useTranslation } from "react-i18next";

export const useLoginData = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading: loading }] = useLoginMutation();
  const { t } = useTranslation();

  const handleLogin = async (email: string, password: string) => {
    try {
      const user = {
        email,
        password,
      };
      const {access,refresh} = await login(user).unwrap();
      dispatch(setToken({ accessToken: access, refreshToken: refresh }));
      dispatch(setAuthenticated({ authState: AuthState.Authenticated }));      
      //disabling this toast as it interferes with pressing skip or otherwise using the app, and doesn't provide much value
      // Toast.show({
      //   type: t("mediaList.success"),
      //   text1: t("mediaList.successfullyloggedin"),
      // });
    } catch (error) {
      Toast.show({
        type: t("mediaList.error"),
        text1:
          error.data.non_field_errors ||
          error.data.password,
      });
    }
  };

  return { handleLogin, loading }
}