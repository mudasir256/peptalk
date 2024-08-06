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
import SignupButtons from "./SignupButtons";

export const SignupScreen = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();

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

      <View style={[style.buttonsContainer, styles.flex]}>
        <SignupButtons
          appleText={t("signUpScreen.appleSignUp")}
          gmailText={t("signUpScreen.gmailSignUp")}
          emailText={t("signUpScreen.emailSignUp")}
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
