import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { style } from "./style";
import PrimaryButton from "../../../common/components/primaryButton";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { COLORS } from "../../../common/theme/colors";
import { useAppDispatch } from "../../../common/store";
import { setAuthenticated } from "../../../common/store/slice/authentication/slice";
import { AuthState } from "../../../common/store/slice/authentication/types";
import { TextInputField } from "../../../common/components/input/input";
import { PasswordInput } from "../../../common/components/passwordInput/passwordInput";
import { KeyboardAvoidingViewWrapper } from "../../../common/components/keyboardAvoidingViewWrapper/keyboardAvoidingViewWrapper";
import { SPACINGS } from "../../../common/theme/spacing";
import { useTranslation } from "react-i18next";

export const SignUpWithEmail = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [formValid, setFormValid] = useState<boolean>(false);

  const termsOfServiceSelection = useRef(false);
  const firstName = useRef<string>(undefined);
  const lastName = useRef<string>(undefined);
  const email = useRef<string>(undefined);
  const password = useRef<string>(undefined);

  const [firstNameError, setFirstNameError] = useState<string>(undefined);
  const [lastNameError, setLastNameError] = useState<string>(undefined);
  const [emailError, setEmailError] = useState<string>(undefined);
  const [passwordError, setPasswordError] = useState<string>(undefined);

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

  const onCreateAccountPress = () =>
    dispatch(setAuthenticated({ authState: AuthState.Authenticated }));

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
              {" "}
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
          onPress={onCreateAccountPress}
          disabled={!formValid}
        />
      </View>
    </KeyboardAvoidingViewWrapper>
  );
};
