import React, { useRef, useState } from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from "react-native";
import { InputField } from "./input";
import { style } from "./style";
import PrimaryButton from "../../../common/components/primaryButton";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { COLORS } from "../../../common/theme/colors";
import { useAppDispatch } from "../../../common/store";
import { setAuthenticated } from "../../../common/store/slice/authentication/slice";
import { AuthState } from "../../../common/store/slice/authentication/types";

export const SignUpWithEmail = () => {
  const dispatch = useAppDispatch()
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
    validateForm()
  }

  const setFirstName = (value: string) => {
    firstName.current = value;
    setFirstNameError(value ? '' : 'Please enter first name');
    validateForm()
  };

  const setLastName = (value: string) => {
    lastName.current = value;
    setLastNameError(value ? '' : 'Please enter last name');
    validateForm()
  }
  const setEmail = (value: string) => {
    email.current = value;
    setEmailError(value ? validateEmail(value) ? '' : 'Please enter a valid email address' : 'Please enter email address')
    validateForm()
  };

  const setPassword = (value: string) => {
    password.current = value;
    setPasswordError(validatePassword(value) ? '' : 'Password must be at least 8 characters long');
    validateForm()
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

  const onCreateAccountPress = () => dispatch(setAuthenticated({authState: AuthState.Authenticated}))

  return (
    <KeyboardAvoidingView style={style.container} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={style.innerContainer}>
          <InputField
            placeholder="First Name"
            onChangeText={text => setFirstName(text)}
            validationError={firstNameError}
          />
          <InputField
            placeholder="Last Name"
            onChangeText={text => setLastName(text)}
            validationError={lastNameError}
          />
          <InputField
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            validationError={emailError}
          />
          <InputField
            placeholder="password (8+ characters)"
            onChangeText={text => setPassword(text)}
            isPasswordVisible={true}
            validationError={passwordError}
          />
          <View
            style={style.checkboxContainer}
          >
            <BouncyCheckbox
              size={25}
              fillColor={COLORS.border}
              unFillColor="#FFFFFF"
              iconStyle={{ borderColor:COLORS.text }}
              innerIconStyle={style.checkbox}
              textStyle={{ fontFamily: "JosefinSans-Regular" }}
              onPress={toggleCheckbox}
            />
            <View style={style.labelContainer}>
              <Text style={style.label}>By continuing you agree to our</Text>
              <Text style={style.labellink}> terms of service</Text>
            </View>
          </View>
          <PrimaryButton
            title={"Create Account"}
            containerStyle={{...style.buttonContainer, opacity: formValid ? 1 : 0.5, alignSelf: 'center' }}
            onPress={onCreateAccountPress}
            disabled={!formValid} 
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
