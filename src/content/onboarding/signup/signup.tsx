import React from 'react';
import { View, Text, ImageBackground, Alert, SafeAreaView } from 'react-native';
import { useAppleIdSignin } from './useAppleIdSignin';
import { IMAGES } from '../../../assets/images';
import { styles } from '../../../common/theme/styles';
import { style } from './style';
import PrimaryButton from '../../../common/components/primaryButton/index';
import { useNavigation } from "@react-navigation/native";
import { LoginStackRoutes } from '../../../common/navigation/routes';
import { useAppDispatch } from '../../../common/store';
import { setAuthenticated } from '../../../common/store/slice/authentication/slice';
import { AuthState } from '../../../common/store/slice/authentication/types';
import { SPACINGS } from '../../../common/theme/spacing';

export const SignupScreen = () => {
  const { navigate } = useNavigation();
  const dispatch = useAppDispatch()

  const { signInWithAppleId } = useAppleIdSignin();

  const onAppldIdPress = () => {
    Alert.alert(
      'Terms Of Service',
      "By continuing you agree to Mom Brain's Terms Of Service",
      [
        {
          text: 'Cancel',
          onPress: () => console.log("cancel"),
          style: "cancel"
        },
        {
          text: 'Ok',
          onPress: async () => {
            try {
              const credential = await signInWithAppleId();
              dispatch(setAuthenticated({ authState: AuthState.Authenticated }))
            } catch (error) {
              console.error('Apple ID Sign-In Error:', error);
            }
          }
        }
      ]
    );
  };

  const SignupWithEmail = () =>
    navigate(LoginStackRoutes.SignUpWithEmail);

  return (
    <SafeAreaView style={[styles.flex, style.container]}>
      <ImageBackground
        source={IMAGES.signupBackground}
        resizeMode="cover"
        style={[styles.center, style.imageBg]}
      >
        <Text style={style.getStartedText}>Let's Get Started!</Text>
      </ImageBackground>
      <View style={styles.flex} />
      <View style={style.buttonsContainer}>
        <PrimaryButton
          containerStyle={{ marginBottom: SPACINGS.md }}
          title="Sign Up With Apple"
          icon={IMAGES.appleIcon}
          onPress={onAppldIdPress}
        />
        <PrimaryButton
          containerStyle={{ marginBottom: SPACINGS.md }}
          title="Sign Up With Google"
          icon={IMAGES.googleIcon}
          onPress={() => { }}
        />
        <PrimaryButton
          containerStyle={{ alignSelf: 'center' }}
          title="Sign Up With Email"
          icon={IMAGES.emailIcon}
          onPress={SignupWithEmail}
        />
        <View style={style.loginContainer}>
          <Text style={style.alreadyAccount}>Already have an account?</Text>
          <Text style={style.loginButton}>Login</Text>
        </View>
      </View>
    </SafeAreaView >
  );
};
