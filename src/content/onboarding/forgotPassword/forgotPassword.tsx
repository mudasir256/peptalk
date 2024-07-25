import React, { useEffect, useState } from "react";
import { View } from "react-native";
import PrimaryButton from "../../../common/components/primaryButton";
import { TextInputField } from "../../../common/components/input/input";
import { KeyboardAvoidingViewWrapper } from "../../../common/components/keyboardAvoidingViewWrapper/keyboardAvoidingViewWrapper";
import { SPACINGS } from "../../../common/theme/spacing";
import { useTranslation } from "react-i18next";
import { styles } from "../../../common/theme/styles";
import { style } from "../login/style";
import Toast from "react-native-toast-message";
import { useForgotPasswordMutation } from "../../../common/store/slice/api/slice";

const Forgotpassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [formValid, setFormValid] = useState(false);

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleResetPassword = async () => {
    const data = {
      email: email,
    };
    try {
      const response = await forgotPassword(data).unwrap();
      Toast.show({
        type: "success",
        text1: t("mediaList.forgotPasswordEmailSentSuccessfully"),
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1:
          error.data?.email || t("mediaList.failedToSendForgotPasswordEmail"),
      });
    }
  };

  useEffect(() => {
    setFormValid(email.trim() !== "");
  }, [email]);

  return (
    <KeyboardAvoidingViewWrapper>
      <View style={style.innerContainer}>
        <View style={[styles.flex, { justifyContent: "flex-start" }]}>
          <TextInputField
            containerStyle={{ marginTop: SPACINGS.md }}
            placeholder={t("signUpWithEmail.email")}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <PrimaryButton
            title={t("common.resetpassword")}
            onPress={handleResetPassword}
            containerStyle={{
              ...style.buttonContainer,
              opacity: formValid ? 1 : 0.5,
              alignSelf: "center",
              marginTop: SPACINGS.md,
            }}
            disabled={!formValid}
            loading={isLoading}
          />
        </View>
      </View>
    </KeyboardAvoidingViewWrapper>
  );
};

export default Forgotpassword;
