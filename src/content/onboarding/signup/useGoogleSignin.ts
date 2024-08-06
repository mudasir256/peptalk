import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useGoogleLoginMutation } from "../../../common/store/slice/api/slice";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import {
  setAuthenticated,
  setToken,
} from "../../../common/store/slice/authentication/slice";
import { AuthState } from "../../../common/store/slice/authentication/types";
import { useTranslation } from "react-i18next";

export const useGoogleSignin = () => {
  const [google] = useGoogleLoginMutation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "260983470678-sq87q4u6noc91tc69klrbvl44h9c2dgu.apps.googleusercontent.com",
      iosClientId:
        "260983470678-llgh2nsq1v9p3aa1g991s5pvo0b82ocu.apps.googleusercontent.com",
    });
  }, []);

  const onGoogleButtonPress = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const accessToken = await GoogleSignin.getTokens();
      if (userInfo) {
        const dataToSubmit = {
          access_token: accessToken.accessToken,
        };
        const res = await google(dataToSubmit).unwrap();
        dispatch(
          setToken({ accessToken: res.access, refreshToken: res.refresh })
        );
        dispatch(setAuthenticated({ authState: AuthState.Authenticated }));
        Toast.show({
          type: t("mediaList.success"),
          text1: t("mediaList.signedinsuccessfully"),
        });
      }
    } catch (error) {
      Toast.show({
        type: t("mediaList.error"),
        text1: t("mediaList.failedsignin"),
      });
    } finally {
      setIsLoading(false);
    }
  };
  return { onGoogleButtonPress, isLoading };
};
