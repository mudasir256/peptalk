import * as AppleAuthentication from "expo-apple-authentication";
import { useAppleLoginMutation } from "../../../common/store/slice/api/slice";
import { useDispatch } from "react-redux";
import {
  setAuthenticated,
  setToken,
} from "../../../common/store/slice/authentication/slice";
import { AuthState } from "../../../common/store/slice/authentication/types";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export const useAppleIdSignin = () => {
  const [apple] = useAppleLoginMutation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const signInWithAppleId = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (credential) {
        const dataToSubmit = {
          id_token: credential.authorizationCode,
        };
        console.log("token", credential)
        return;
        const res = await apple(dataToSubmit).unwrap();
        console.log(res);
        dispatch(setToken({ accessToken: res.data.access }));
        dispatch(setAuthenticated({ authState: AuthState.Authenticated }));
        Toast.show({
          type: t("mediaList.success"),
          text1: t("mediaList.signedinsuccessfully"),
        });
      }
    } catch (e) {
      console.log(e);
      Toast.show({
        type: t("mediaList.error"),
        text1: t("mediaList.failedsignin"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signInWithAppleId,
    isLoading,
  };
};
