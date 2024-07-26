import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { ButtonTextPrimary, Label } from "../../../common/theme/typography";
import { SPACINGS } from "../../../common/theme/spacing";
import { COLORS } from "../../../common/theme/colors";
import { styles } from "../../../common/theme/styles";
import { PasswordInput } from "../../../common/components/passwordInput/passwordInput";
import PrimaryButton from "../../../common/components/primaryButton";
import { HomeStackRoutes } from "../../../common/navigation/routes";
import { useResetPasswordMutation } from "../../../common/store/slice/api/slice";
import Toast from "react-native-toast-message";

import { useFormik } from "formik";
import * as Yup from "yup";

const Password = () => {
  const navigation = useNavigation();
  const { navigate } = useNavigation();
  const { t } = useTranslation();
  const [resetPassword, { isError, isLoading }] = useResetPasswordMutation();
  const [oldPassword, setOldPassword] = useState("");

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required(t("common.required"))
        .min(8, t("password.minLengthError"))
        .max(30, t("password.maxLengthError")),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], t("password.passwordsMustMatch"))
        .required(t("common.required")),
    }),
    onSubmit: async (values) => {
      try {
        const data = {
          new_password1: values.newPassword,
          new_password2: values.confirmPassword,
        };
        const res = await resetPassword(data).unwrap();
        Toast.show({
          type: t("mediaList.success"),
          text1: t("mediaList.passwordchangesuccessfully"),
        });
      } catch (error) {
        Toast.show({
          type: t("mediaList.error"),
          text1:
            error.data.new_password2 ||
            error.data.new_password1 ||
            t("mediaList.errorupdatingpassword"),
        });
      }
    },
  });

  const formValid = formik.isValid;

  const handleForgotPress = () => {
    navigate(HomeStackRoutes.ResetPasswordWithEmail);
  };

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  /*
  const validateForm = () => {
    const isValid = newPassword.trim() !== "" && confirmPassword.trim() !== "";
    setFormValid(isValid);
  };

  useEffect(() => {
    validateForm();
  }, [newPassword, confirmPassword]);
  */

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <ScrollView>
        <View style={style.container}>
          <View style={style.head}>
            <TouchableOpacity style={style.back} onPress={goBack}>
              <Ionicons name="chevron-back" size={24} color="black" />
              <Text style={style.backbtn}>{t("common.back")}</Text>
            </TouchableOpacity>
            <Text style={style.title}>{t("password.password")}</Text>
          </View>
        </View>
        <View style={style.content}>
          {/*<View style={style.inputContainer}>
            <Text style={style.label}>{t("password.oldpassword")}</Text>
            <PasswordInput
              placeholder={t("password.oldpassword")}
              onChangeText={(text) => setOldPassword(text)}
            />
            <TouchableOpacity onPress={handleForgotPress}>
              <Text style={style.forgotlabel}>
                {t("password.forgotpassword")}
              </Text>
            </TouchableOpacity>
          </View>*/}

          <View style={style.inputContainer}>
            <Text style={style.label}>{t("password.newpassword")}</Text>
            <PasswordInput
              placeholder={t("password.newpassword")}
              onChangeText={formik.handleChange("newPassword")}
            />
            {formik.errors.newPassword && (
              <Text className="mt-0" style={{ color: COLORS.error }}>
                {formik.errors.newPassword}
              </Text>
            )}
          </View>

          <View style={style.inputContainer}>
            <Text style={style.label}>{t("password.confirmnewpassword")}</Text>
            <PasswordInput
              placeholder={t("password.confirmnewpassword")}
              onChangeText={formik.handleChange("confirmPassword")}
            />
            {formik.errors.confirmPassword && (
              <Text className="mt-0" style={{ color: COLORS.error }}>
                {formik.errors.confirmPassword}
              </Text>
            )}
          </View>
        </View>
        <View style={style.buttonContainer}>
          <PrimaryButton
            title={t("password.changepassword")}
            containerStyle={{
              ...style.button,
              opacity: formValid ? 1 : 0.5,
            }}
            disabled={!formValid}
            onPress={handleSubmit}
            loading={isLoading}
          />
        </View>

        <Text
          className=" self-stretch text-center mb-5 text-[20px] font-medium"
          style={{ color: COLORS.text }}
        >
          {t("common.or")}
        </Text>

        <View style={style.buttonContainer}>
          <PrimaryButton
            title={t("password.forgotpassword")}
            containerStyle={{
              ...style.button,
              opacity: formValid ? 1 : 0.5,
            }}
            //disabled={!formValid}
            onPress={handleForgotPress}
            loading={isLoading}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default Password;

const style = StyleSheet.create({
  container: {
    borderBottomRightRadius: SPACINGS.Radius,
    borderBottomLeftRadius: SPACINGS.Radius,
    backgroundColor: COLORS.header,
    padding: SPACINGS.md,
  },
  back: {
    ...styles.rowCenter,
  },
  backbtn: {
    ...ButtonTextPrimary,
  },
  head: {
    ...styles.rowCenter,
  },
  title: {
    ...ButtonTextPrimary,
    ...styles.flex,
    ...styles.rowCenter,
    marginRight: SPACINGS.max,
  },
  content: {
    padding: SPACINGS.md,
    flex: 1,
  },
  button: {
    backgroundColor: COLORS.secondary,
    borderRadius: SPACINGS.Radius,
    borderWidth: 0,
    marginBottom: SPACINGS.xl,
  },
  buttonContainer: {
    ...styles.end,
    ...styles.alignCenter,
  },
  inputContainer: {
    marginBottom: SPACINGS.sm,
  },
  label: {
    ...Label,
    paddingBottom: 5,
  },
  forgotlabel: {
    ...Label,
    color: COLORS.link,
    alignSelf: "flex-end",
  },
});
