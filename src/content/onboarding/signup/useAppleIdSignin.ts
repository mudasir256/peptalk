import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as AppleAuthentication from "expo-apple-authentication";
import { useAppleLoginMutation } from "../../../common/store/slice/api/slice";
import {
  setAuthenticated,
  setToken,
} from "../../../common/store/slice/authentication/slice";
import { AuthState } from "../../../common/store/slice/authentication/types";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        const { authorizationCode, fullName } = credential;

        let dataToSubmit;

        if (fullName && fullName.givenName && fullName.familyName) {
          dataToSubmit = {
            authorization_code: authorizationCode,
            first_name: fullName.givenName,
            last_name: fullName.familyName,
          };
        } else {
          dataToSubmit = {
            authorization_code: authorizationCode,
          };
        }
        const res = await apple(dataToSubmit).unwrap();
          dispatch(setToken({ accessToken: res.access, refreshToken: res.refresh }));
          dispatch(setAuthenticated({ authState: AuthState.Authenticated }));

          Toast.show({
            type: "success",
            text1: t("mediaList.signedinsuccessfully"),
          });
        } 
    } catch (e) {
      Toast.show({
        type: "error",
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