import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useGoogleLoginMutation } from "../../../common/store/slice/api/slice";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { setAuthenticated, setToken } from "../../../common/store/slice/authentication/slice";
import { AuthState } from "../../../common/store/slice/authentication/types";

export const useGoogleSignin = () => {
  const [google] = useGoogleLoginMutation();
  const dispatch = useDispatch()

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "761974158882-9kc3bs445migs34p5bjjq7f7hb0ib073.apps.googleusercontent.com",
      iosClientId:
        "761974158882-mc925asj9779rbl11blbpadgbgpuak53.apps.googleusercontent.com",
    });
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const accessToken = await GoogleSignin.getTokens();
      if (userInfo) {
        const dataToSubmit = {
          access_token: accessToken.accessToken,
        };
        const res = await google(dataToSubmit).unwrap()
        dispatch(setToken({ accessToken: res.access , refreshToken:res.refresh }));
        dispatch(setAuthenticated({ authState: AuthState.Authenticated }));
          Toast.show({
            type: "success",
            text1: "Signed in Successfully",
          });
        }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed in Signin",
      });
      console.error("Google Sign-In Error:", error);
    }
  };
  return { onGoogleButtonPress };
};
