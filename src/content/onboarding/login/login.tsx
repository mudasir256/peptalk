import React, { useRef } from "react";
import { View } from "react-native";
import { style } from "./style";
import PrimaryButton from "../../../common/components/primaryButton";
import { TextInputField } from "../../../common/components/input/input";
import { PasswordInput } from "../../../common/components/passwordInput/passwordInput";
import { KeyboardAvoidingViewWrapper } from "../../../common/components/keyboardAvoidingViewWrapper/keyboardAvoidingViewWrapper";
import { SPACINGS } from "../../../common/theme/spacing";
import { useTranslation } from "react-i18next";
import { styles } from "../../../common/theme/styles";
import { useLoginData } from "./useLoginData";

const Login = () => {
  const { t } = useTranslation();
  const { handleLogin, loading } = useLoginData();
  const email = useRef<string>(undefined);
  const password = useRef<string>(undefined);

  const onLoginPress = () => {
    handleLogin(email.current, password.current);
  };

  const setEmail = (value: string) => {
    email.current = value;
  };

  const setPassword = (value: string) => {
    password.current = value;
  };

  return (
    <KeyboardAvoidingViewWrapper>
      <View style={{ ...style.innerContainer }}>
        <View
          style={{
            ...styles.flex,
            justifyContent: "flex-end",
          }}
        >
          <TextInputField
            autoCapitalize="none"
            containerStyle={{ marginTop: SPACINGS.md }}
            placeholder={t("signUpWithEmail.email")}
            onChangeText={(text) => setEmail(text)}
          />
          <PasswordInput
            containerStyle={{ marginTop: SPACINGS.md }}
            placeholder={t("signUpWithEmail.password")}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <View style={style.spacer}></View>
        <PrimaryButton
          loading={loading}
          title={t("common.login")}
          containerStyle={{
            ...style.buttonContainer,
            alignSelf: "center",
          }}
          onPress={onLoginPress}
        />
      </View>
    </KeyboardAvoidingViewWrapper>
  );
};

export default Login;
