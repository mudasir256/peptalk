import { useNavigation } from "@react-navigation/native";
import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { IMAGES } from "../../../assets/images";
import PrimaryButton from "../../../common/components/primaryButton/index";
import { LoginStackRoutes } from "../../../common/navigation/routes";
import { SPACINGS } from "../../../common/theme/spacing";
import { useAppleIdSignin } from "./useAppleIdSignin";
import { useGoogleSignin } from "./useGoogleSignin";
import { COLORS } from "../../../common/theme/colors";
import YesOrNoModal from "../../../common/components/Modals/YesOrNoModal.tsx/YesOrNoModal";

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

    const { signInWithAppleId, isLoading: isAppleLoading } = useAppleIdSignin();
    const { onGoogleButtonPress, isLoading: isGoogleLodaing } =
      useGoogleSignin();

    const isLoading = isAppleLoading || isGoogleLodaing;

    const [isAcceptPolicyModalVisible, setIsAcceptPolicyModalVisible] =
      useState(false);
    const showAcceptPolicyModal = () => {
      setIsAcceptPolicyModalVisible(true);
    };
    const closeAcceptPolicyModal = () => {
      setIsAcceptPolicyModalVisible(false);
    };
    const onOressOkForAcceptPolicyModal = () => {
      setIsAcceptPolicyModalVisible(false);
      signInWithAppleId();
    };

    const onAppldIdPress = () => {
      if (isLoading) {
        return;
      }
      showAcceptPolicyModal();
    };

    const _onGoogleButtonPress = () => {
      if (isLoading) {
        return;
      }
      onGoogleButtonPress();
    };

    const SignupWithEmail = () => navigate(LoginStackRoutes.SignUpWithEmail);

    return (
      <View className=" self-stretch items-center">
        {isAcceptPolicyModalVisible && (
          <YesOrNoModal
            visible={isAcceptPolicyModalVisible}
            onClose={closeAcceptPolicyModal}
            title={t("signUpScreen.termsAlert1")}
            description={t("signUpScreen.termsAlert2")}
            onPressOk={onOressOkForAcceptPolicyModal}
            okButtonText={t("signUpScreen.ok")}
            cancelButtonText={t("signUpScreen.cancel")}
          />
        )}
        <PrimaryButton
          containerStyle={{ marginBottom: SPACINGS.md }}
          title={appleText}
          icon={IMAGES.appleIcon}
          onPress={onAppldIdPress}
          loading={isAppleLoading}
          loadingColor={COLORS.text}
        />
        <PrimaryButton
          containerStyle={{ marginBottom: SPACINGS.md }}
          title={gmailText}
          icon={IMAGES.googleIcon}
          onPress={_onGoogleButtonPress}
          loading={isGoogleLodaing}
          loadingColor={COLORS.text}
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
