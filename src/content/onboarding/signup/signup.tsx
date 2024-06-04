import React, { useEffect } from "react";
import { View, Text, ImageBackground, Alert, SafeAreaView } from "react-native";
import { useAppleIdSignin } from "./useAppleIdSignin";
import { IMAGES } from "../../../assets/images";
import { styles } from "../../../common/theme/styles";
import { style } from "./style";
import PrimaryButton from "../../../common/components/primaryButton/index";
import { useNavigation } from "@react-navigation/native";
import { LoginStackRoutes } from "../../../common/navigation/routes";
import { useAppDispatch } from "../../../common/store";
import { setAuthenticated } from "../../../common/store/slice/authentication/slice";
import { AuthState } from "../../../common/store/slice/authentication/types";
import { SPACINGS } from "../../../common/theme/spacing";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useGoogleSignin } from "./useGoogleSignin";

export const SignupScreen = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const dispatch = useAppDispatch();

  const { signInWithAppleId } = useAppleIdSignin();
  const { onGoogleButtonPress } = useGoogleSignin();

  const onAppldIdPress = () => {
    Alert.alert(t("signUpScreen.termsAlert1"), t("signUpScreen.termsAlert2"), [
      {
        text: t("signUpScreen.cancel"),
        onPress: () => console.log("cancel"),
        style: "cancel",
      },
      {
        text: t("signUpScreen.ok"),
        onPress: signInWithAppleId,
      },
    ]);
  };

  const SignupWithEmail = () => navigate(LoginStackRoutes.SignUpWithEmail);
  const handleLogin = () => navigate(LoginStackRoutes.Login);

  return (
    <SafeAreaView style={[styles.flex, style.container]}>
      <ImageBackground
        source={IMAGES.signupBackground}
        resizeMode="cover"
        style={[styles.center, style.imageBg]}
      >
        <Text style={style.getStartedText}>{t("signUpScreen.title")}</Text>
      </ImageBackground>
      <View style={styles.flex} />
      <View style={style.buttonsContainer}>
        <PrimaryButton
          containerStyle={{ marginBottom: SPACINGS.md }}
          title={t("signUpScreen.appleSignUp")}
          icon={IMAGES.appleIcon}
          onPress={onAppldIdPress}
        />
        <PrimaryButton
          containerStyle={{ marginBottom: SPACINGS.md }}
          title={t("signUpScreen.gmailSignUp")}
          icon={IMAGES.googleIcon}
          onPress={onGoogleButtonPress}
        />
        <PrimaryButton
          containerStyle={{ alignSelf: "center" }}
          title={t("signUpScreen.emailSignUp")}
          icon={IMAGES.emailIcon}
          onPress={SignupWithEmail}
        />
        <View style={style.loginContainer}>
          <Text style={style.alreadyAccount}>{t("signUpScreen.already")}</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={style.loginButton}>{t("landingScreen.login")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
