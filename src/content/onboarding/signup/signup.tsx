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
          onPress: () => {
            try {
              const credential = signInWithAppleId();
              credential.then(() => {
                dispatch(setAuthenticated({authState: AuthState.Authenticated}))
              }).catch(error => {
                console.error('Apple ID Sign-In Error:', error);
              });
            } catch (e) {
              console.error('Error:', e);
            }
          }
        }
      ]
    );
  };
  
  const SignupWithEmail = () => {
    navigate(LoginStackRoutes.SignUpWithEmail);
  }

  return (
    <SafeAreaView style={[styles.flex, style.container]}>
      <ImageBackground
        source={IMAGES.signupBackground}
        resizeMode="cover"
        style={[styles.center, style.imageBg]}
      >
        <Text style={style.getStartedText}>Let's Get Started!</Text>
      </ImageBackground>
      <View style={styles.flex}/>
      <View style={style.buttonsContainer}>
        <PrimaryButton
          onPress={onAppldIdPress}
          icon={IMAGES.appleIcon}
          title="Sign Up With Apple"
          containerStyle={{ marginBottom: 20 }}
        />
        <PrimaryButton
          onPress={() =>{}}
          icon={IMAGES.googleIcon}
          title="Sign Up With Google"
          containerStyle={{ marginBottom: 20 }}
        />
        <PrimaryButton
          containerStyle={{alignSelf: 'center'}}
          onPress={SignupWithEmail}
          icon={IMAGES.emailIcon}
          title="Sign Up With Email"
        />
        <View style={style.loginContainer}>
          <Text style={style.alreadyAccount}>Already have an account?</Text>
          <Text style={style.loginButton}>Login</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
