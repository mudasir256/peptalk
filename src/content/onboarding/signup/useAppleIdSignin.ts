import * as AppleAuthentication from 'expo-apple-authentication'

export const useAppleIdSignin = () => {
  
  const signInWithAppleId = async() => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes:[
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
    } catch (e) {
      throw e
    }
  }

  return {
    signInWithAppleId
  }
}