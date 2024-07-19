import React, { useRef, useState } from "react";
import { View, Text } from "react-native";
import { style } from "./style";
import PrimaryButton from "../../../common/components/primaryButton";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { COLORS } from "../../../common/theme/colors";
import { useAppDispatch } from "../../../common/store";
import {
  setAuthenticated,
  setToken,
} from "../../../common/store/slice/authentication/slice";
import { AuthState } from "../../../common/store/slice/authentication/types";
import { TextInputField } from "../../../common/components/input/input";
import { PasswordInput } from "../../../common/components/passwordInput/passwordInput";
import { KeyboardAvoidingViewWrapper } from "../../../common/components/keyboardAvoidingViewWrapper/keyboardAvoidingViewWrapper";
import { SPACINGS } from "../../../common/theme/spacing";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import { ApiResponse } from "../../../../common/types";
import { useRegisterMutation } from "../../../common/store/slice/api/slice";

export const SignUpWithEmail = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [formValid, setFormValid] = useState<boolean>(false);
  const [register, { isLoading }] = useRegisterMutation();

  const termsOfServiceSelection = useRef(false);
  const firstName = useRef<string>(undefined);
  const lastName = useRef<string>(undefined);
  const email = useRef<string>(undefined);
  const password = useRef<string>(undefined);

  const [firstNameError, setFirstNameError] = useState<string>(undefined);
  const [lastNameError, setLastNameError] = useState<string>(undefined);
  const [emailError, setEmailError] = useState<string>(undefined);
  const [passwordError, setPasswordError] = useState<string>(undefined);

  const handleCreateAccount = async () => {
    try {
      const user = {
        first_name: firstName.current,
        last_name: lastName.current,
        email: email.current,
        password1: password.current,
        password2: password.current,
      };
      const response: ApiResponse = await register(user).unwrap();
      if ("access" in response) {
        Toast.show({
          type: t("mediaList.success"),
          text1: t("mediaList.successfullysignedup"),
        });
        const access: string = response.access;
        dispatch(setToken({ accessToken: access }));
        dispatch(setAuthenticated({ authState: AuthState.Authenticated }));
      } else {
        console.error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Toast.show({
        type: "error",
        text1:
          error.data.password1 ||
          error.data.email ||
          error.data?.non_field_errors?.[0] ||
          t("mediaList.erroraccor"),
      });
      if (error.data?.non_field_errors?.[0]) {
        setPasswordError(error.data?.non_field_errors?.[0]);
      }
    }
  };

  const toggleCheckbox = (isChecked: boolean) => {
    termsOfServiceSelection.current = isChecked;
    validateForm();
  };

  const setFirstName = (value: string) => {
    firstName.current = value;
    setFirstNameError(value ? "" : t("signUpWithEmail.errorMessageFirstName"));
    validateForm();
  };

  const setLastName = (value: string) => {
    lastName.current = value;
    setLastNameError(value ? "" : t("signUpWithEmail.errorMessageLastName"));
    validateForm();
  };
  const setEmail = (value: string) => {
    email.current = value;
    setEmailError(
      value
        ? validateEmail(value)
          ? ""
          : t("signUpWithEmail.errorMessageValidEmail")
        : t("signUpWithEmail.errorMessageEmail")
    );
    validateForm();
  };

  const setPassword = (value: string) => {
    password.current = value;
    setPasswordError(
      validatePassword(value) ? "" : t("signUpWithEmail.errorMessagePassword")
    );
    validateForm();
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password && password.length >= 8;
  };

  const validateForm = () => {
    const isFormValid: boolean =
      termsOfServiceSelection.current &&
      firstName.current &&
      lastName.current &&
      validateEmail(email.current) &&
      validatePassword(password.current);
    setFormValid(isFormValid);
  };
  return (
    <KeyboardAvoidingViewWrapper>
      <View style={{ ...style.innerContainer }}>
        <TextInputField
          placeholder={t("signUpWithEmail.firstName")}
          onChangeText={(text) => setFirstName(text)}
          validationError={firstNameError}
        />
        <TextInputField
          containerStyle={{ marginTop: SPACINGS.md }}
          placeholder={t("signUpWithEmail.lasttName")}
          onChangeText={(text) => setLastName(text)}
          validationError={lastNameError}
        />
        <TextInputField
          containerStyle={{ marginTop: SPACINGS.md }}
          placeholder={t("signUpWithEmail.email")}
          onChangeText={(text) => setEmail(text)}
          validationError={emailError}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <PasswordInput
          containerStyle={{ marginTop: SPACINGS.md }}
          placeholder={t("signUpWithEmail.password")}
          onChangeText={(text) => setPassword(text)}
          validationError={passwordError}
        />
        <View style={style.checkboxContainer}>
          <BouncyCheckbox
            size={25}
            fillColor={COLORS.border}
            unFillColor="#FFFFFF"
            iconStyle={[style.checkbox, { borderColor: COLORS.text }]}
            innerIconStyle={style.checkbox}
            onPress={toggleCheckbox}
          />
          <View style={style.labelContainer}>
            <Text style={style.label}>{t("signUpWithEmail.checkbox")}</Text>
            <Text style={style.labellink}>
              {t("signUpWithEmail.checkboxLink")}
            </Text>
          </View>
        </View>
        <View style={style.spacer}></View>
        <PrimaryButton
          title={t("signUpWithEmail.createAccount")}
          containerStyle={{
            ...style.buttonContainer,
            opacity: formValid ? 1 : 0.5,
            alignSelf: "center",
          }}
          onPress={handleCreateAccount}
          disabled={!formValid}
          loading={isLoading}
        />
      </View>
    </KeyboardAvoidingViewWrapper>
  );
};
