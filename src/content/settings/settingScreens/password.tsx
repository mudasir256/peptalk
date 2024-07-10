import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
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

const Password = () => {
  const navigation = useNavigation();
  const { navigate } = useNavigation();
  const { t } = useTranslation();
  const [resetPassword, { isError, isLoading }] = useResetPasswordMutation();
  const [formValid, setFormValid] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleResetPassword = async () => {
    try {
      const data = {
        new_password1: newPassword,
        new_password2: confirmPassword,
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
          t("mediaList.errorupdatngpassword"),
      });
      console.log("errors", error);
    }
  };
  const goBack = () => {
    navigation.goBack();
  };

  const handleForgotPress = () => {
    navigate(HomeStackRoutes.ResetPasswordWithEmail);
  };

  const validateForm = () => {
    const isValid = newPassword.trim() !== "" && confirmPassword.trim() !== "";
    setFormValid(isValid);
  };

  useEffect(() => {
    validateForm();
  }, [newPassword, confirmPassword]);
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
          <View style={style.inputContainer}>
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
          </View>

          <View style={style.inputContainer}>
            <Text style={style.label}>{t("password.newpassword")}</Text>
            <PasswordInput
              placeholder={t("password.newpassword")}
              onChangeText={(text) => setNewPassword(text)}
            />
          </View>

          <View style={style.inputContainer}>
            <Text style={style.label}>{t("password.confirmpassword")}</Text>
            <PasswordInput
              placeholder={t("password.confirmpassword")}
              onChangeText={(text) => setConfirmPassword(text)}
            />
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
            onPress={handleResetPassword}
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
