import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import { TextInputField } from "../../../common/components/input/input";
import { KeyboardAvoidingViewWrapper } from "../../../common/components/keyboardAvoidingViewWrapper/keyboardAvoidingViewWrapper";
import { PasswordInput } from "../../../common/components/passwordInput/passwordInput";
import PrimaryButton from "../../../common/components/primaryButton";
import { LoginStackRoutes } from "../../../common/navigation/routes";
import { COLORS } from "../../../common/theme/colors";
import { SPACINGS } from "../../../common/theme/spacing";
import { styles } from "../../../common/theme/styles";
import SignupButtons from "../signup/SignupButtons";
import { style } from "./style";
import { useLoginData } from "./useLoginData";

const Login = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const { handleLogin, loading } = useLoginData();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().required(t("yup.required")).trim(),
      password: Yup.string().required(t("yup.required")).trim(),
    }),
    onSubmit: (values) => {
      handleLogin(values.email.trim(), values.password.trim());
    },
  });

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
              containerStyle={{ marginTop: SPACINGS.md }}
              placeholder={t("signUpWithEmail.email")}
              onChangeText={formik.handleChange("email")}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {formik.errors.email && (
              <Text style={{ color: COLORS.error }}>{formik.errors.email}</Text>
            )}
            <PasswordInput
              containerStyle={{ marginTop: SPACINGS.md }}
              placeholder={t("signUpWithEmail.password")}
              onChangeText={formik.handleChange("password")}
            />
            {formik.errors.password && (
              <Text style={{ color: COLORS.error }}>
                {formik.errors.password}
              </Text>
            )}
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
            onPress={() => formik.handleSubmit()}
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
