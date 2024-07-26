import { useNavigation } from "@react-navigation/native";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";
import { IMAGES } from "../../../assets/images";
import PrimaryButton from "../../../common/components/primaryButton/index";
import { LoginStackRoutes } from "../../../common/navigation/routes";
import { SPACINGS } from "../../../common/theme/spacing";
import { useAppleIdSignin } from "./useAppleIdSignin";
import { useGoogleSignin } from "./useGoogleSignin";

const SignupButtons = memo(
  ({
    appleText,
    gmailText,
    emailText,
  }: {
    appleText: string;
    gmailText: string;
    emailText?: string;
  }) => {
    const { t } = useTranslation();
    const { navigate } = useNavigation();

    const { signInWithAppleId } = useAppleIdSignin();
    const { onGoogleButtonPress } = useGoogleSignin();

    const onAppldIdPress = () => {
      Alert.alert(
        t("signUpScreen.termsAlert1"),
        t("signUpScreen.termsAlert2"),
        [
          {
            text: t("signUpScreen.cancel"),
            onPress: () => console.log("cancel"),
            style: "cancel",
          },
          {
            text: t("signUpScreen.ok"),
            onPress: signInWithAppleId,
          },
        ]
      );
    };

    const SignupWithEmail = () => navigate(LoginStackRoutes.SignUpWithEmail);

    /*
    const withGoogle = () => {
      onGoogleButtonPress();
    };
    */

    return (
      <View className=" self-stretch items-center">
        <PrimaryButton
          containerStyle={{ marginBottom: SPACINGS.md }}
          title={appleText}
          icon={IMAGES.appleIcon}
          onPress={onAppldIdPress}
        />
        <PrimaryButton
          containerStyle={{ marginBottom: SPACINGS.md }}
          title={gmailText}
          icon={IMAGES.googleIcon}
          onPress={onGoogleButtonPress}
        />
        {emailText && (
          <PrimaryButton
            containerStyle={{ alignSelf: "center" }}
            title={emailText}
            icon={IMAGES.emailIcon}
            onPress={SignupWithEmail}
          />
        )}
      </View>
    );
  }
);

export default SignupButtons;
