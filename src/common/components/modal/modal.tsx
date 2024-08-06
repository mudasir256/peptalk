import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  View,
} from "react-native";
import * as Yup from "yup";
import { Folder } from "../../../content/folders/foldersList/types";
import { COLORS } from "../../theme/colors";
import { TextInputField } from "../input/input";
import PrimaryButton from "../primaryButton";
import { style } from "./style";

type Props = {
  title: string;
  visible?: boolean;
  onClose?: () => void;
  showInput?: boolean;
  showText?: boolean;
  description?: string;
  onPressOk?: (folderName: string) => void;
  id?: number;
  loading?: boolean;
  selectedFolder?: Folder;
  showCancel?: boolean;
  isHeading?: boolean;
};

const CustomModal = ({
  visible,
  onClose,
  title,
  showInput,
  showText,
  description,
  onPressOk,
  id,
  loading,
  selectedFolder,
  showCancel = true,
  isHeading = true,
}: Props) => {
  const { t } = useTranslation();

  const folderNameInitialvalue = selectedFolder?.folder_name ?? "";

  const formik = useFormik({
    initialValues: {
      folderName: folderNameInitialvalue,
    },
    validationSchema: Yup.object({
      folderName: Yup.string()
        .trim()
        .required(t("yup.required"))
        .max(50, t("yup.folderNameMax50")),
    }),
    onSubmit: async (values) => {
      onPressOk?.(values.folderName.trim());
      formik.handleChange("foldername")("");
    },
  });

  const handleCancel = () => {
    formik.handleChange("foldername")("");
    onClose?.();
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        //onRequestClose={handleCancel}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <Text style={style.addNew}>{title}</Text>
              {showText && <Text style={style.description}>{description}</Text>}
              {showInput && (
                <>
                  {isHeading && (
                    <Text style={style.modalTitle}>
                      {t("modal.folderName")}
                    </Text>
                  )}
                  <View>
                    <TextInputField
                      placeholder={t("modal.addFolder")}
                      containerStyle={{ backgroundColor: COLORS.inputbg }}
                      onChangeText={formik.handleChange("folderName")}
                      defaultValue={folderNameInitialvalue}
                    />
                  </View>
                  <View>
                    {formik.errors.folderName && (
                      <Text style={style.error}>
                        {formik.errors.folderName}
                      </Text>
                    )}
                  </View>
                </>
              )}
              <View style={style.buttonContainer}>
                {showCancel && (
                  <PrimaryButton
                    title={t("modal.cancel")}
                    containerStyle={style.cancel}
                    onPress={handleCancel}
                  />
                )}
                <PrimaryButton
                  loading={loading}
                  title={t("modal.ok")}
                  disabled={!formik.isValid}
                  containerStyle={style.ok}
                  onPress={() => formik.handleSubmit()}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

export default CustomModal;
