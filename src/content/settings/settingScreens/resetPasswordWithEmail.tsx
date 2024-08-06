import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { ButtonTextPrimary, Label } from "../../../common/theme/typography";
import { SPACINGS } from "../../../common/theme/spacing";
import { COLORS } from "../../../common/theme/colors";
import { styles } from "../../../common/theme/styles";
import PrimaryButton from "../../../common/components/primaryButton";
import { TextInputField } from "../../../common/components/input/input";
import { useForgotPasswordMutation } from "../../../common/store/slice/api/slice";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";

const ResetPasswordWithEmail = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [sendForgotPassword, { isLoading }] = useForgotPasswordMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().required(t("common.required")),
    }),
    onSubmit: async (values) => {
      const email = values.email.trim();
      sendForgotPassword({ email })
        .then(() => {
          Toast.show({
            type: t("mediaList.success"),
            text1: t("mediaList.forgotPasswordEmailSentSuccessfully"),
          });
        })
        .catch((error) => {
          Toast.show({
            type: t("mediaList.error"),
            text1:
              error.data.email ||
              t("mediaList.failedToSendForgotPasswordEmail"),
          });
        });
    },
  });

  const goBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <>
      <View style={style.container}>
        <View style={style.head}>
          <TouchableOpacity style={style.back} onPress={goBack}>
            <Ionicons name="chevron-back" size={24} color="black" />
            <Text style={style.backbtn}>{t("common.back")}</Text>
          </TouchableOpacity>
          <Text style={style.title}>{t("password.resetpassword")}</Text>
        </View>
      </View>
      <View style={style.content}>
        <View style={style.inputContainer}>
          <Text style={style.label}>{t("password.email")}</Text>
          <TextInputField
            placeholder={t("password.email")}
            keyboardType="email-address"
            autoCapitalize="none"
            defaultValue=""
            onChangeText={formik.handleChange("email")}
          />
          <Text style={{ color: COLORS.error }}>{formik.errors.email}</Text>
        </View>
        <Text style={style.label}>{t("password.description")}</Text>
      </View>
      <View style={style.buttonContainer}>
        <PrimaryButton
          title={t("password.resetpassword")}
          containerStyle={style.button}
          onPress={handleSubmit}
          loading={isLoading}
        />
      </View>
    </>
  );
};

export default ResetPasswordWithEmail;

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
});
