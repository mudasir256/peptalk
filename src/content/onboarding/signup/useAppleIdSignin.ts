import * as AppleAuthentication from 'expo-apple-authentication';
import { useAppleLoginMutation } from '../../../common/store/slice/api/slice';
import { useDispatch } from 'react-redux';
import { setAuthenticated, setToken } from '../../../common/store/slice/authentication/slice';
import { AuthState } from '../../../common/store/slice/authentication/types';
import Toast from 'react-native-toast-message';

export const useAppleIdSignin = () => {
  const [apple] = useAppleLoginMutation();
  const dispatch = useDispatch()
  const signInWithAppleId = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes:[
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (credential) {
      const dataToSubmit = {
        id_token: credential.authorizationCode,
      };
      console.log(credential)
      return
      const res = await apple(dataToSubmit).unwrap() 
      console.log(res)
      dispatch(setToken({ accessToken: res.data.access }));
      dispatch(setAuthenticated({ authState: AuthState.Authenticated }));
        Toast.show({
          type: "success",
          text1: "Signed in Successfully",
        });
      }
    } catch (e) {
      console.log(e) 
      Toast.show({
        type: "error",
        text1: "Failed to sign up",
      });
    }
  };

  return {
    signInWithAppleId
  };
};
