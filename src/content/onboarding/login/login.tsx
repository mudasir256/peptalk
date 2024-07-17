import React, { useRef } from "react";
import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import { style } from "./style";
import PrimaryButton from "../../../common/components/primaryButton";
import { TextInputField } from "../../../common/components/input/input";
import { PasswordInput } from "../../../common/components/passwordInput/passwordInput";
import { KeyboardAvoidingViewWrapper } from "../../../common/components/keyboardAvoidingViewWrapper/keyboardAvoidingViewWrapper";
import { SPACINGS } from "../../../common/theme/spacing";
import { useTranslation } from "react-i18next";
import { styles } from "../../../common/theme/styles";
import { useNavigation } from "@react-navigation/native";
import { useLoginData } from "./useLoginData";
import { LoginStackRoutes } from "../../../common/navigation/routes";
import SignupButtons from "../signup/SignupButtons";
import { COLORS } from "../../../common/theme/colors";

const Login = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
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
  const handleForgotPress = () => {
    navigate(LoginStackRoutes.ForgotPassword);
  };

  return (
    <KeyboardAvoidingViewWrapper>
      <ScrollView>
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
            <TouchableOpacity onPress={handleForgotPress}>
              <Text style={style.forgotlabel}>
                {t("password.forgotpassword")}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="h-10" />

          <PrimaryButton
            loading={loading}
            title={t("common.login")}
            containerStyle={{
              ...style.buttonContainer,
              alignSelf: "center",
            }}
            onPress={onLoginPress}
          />

          <Text
            className=" self-stretch text-center mb-5 text-[20px] font-medium"
            style={{ color: COLORS.text }}
          >
            {t("common.or")}
          </Text>

          <SignupButtons
            appleText={t("signUpScreen.appleLogIn")}
            gmailText={t("signUpScreen.gmailLogIn")}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingViewWrapper>
  );
};

export default Login;
