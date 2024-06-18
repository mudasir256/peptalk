import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { ButtonTextPrimary, Label } from "../../../common/theme/typography";
import { SPACINGS } from "../../../common/theme/spacing";
import { COLORS } from "../../../common/theme/colors";
import { styles } from "../../../common/theme/styles";
import { PasswordInput } from "../../../common/components/passwordInput/passwordInput";
import PrimaryButton from "../../../common/components/primaryButton";

const ResetPasswordWithEmail = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const goBack = () => {
    navigation.goBack();
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
          <PasswordInput placeholder={t("password.email")} />
        </View>
        <Text style={style.label}>{t("password.description")}</Text>
      </View>
      <View style={style.buttonContainer}>
        <PrimaryButton
          title={t("password.resetpassword")}
          containerStyle={style.button}
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
