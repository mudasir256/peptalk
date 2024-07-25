import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Folder } from "../../../content/folders/foldersList/types";

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
};

const CustomAlertPrompt = ({
  visible,
  onClose,
  title,
  showInput,
  showText,
  description,
  onPressOk,
  selectedFolder,
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
      formik.handleChange("folderName")("");
    },
  });

  useEffect(() => {
    if (visible) {
      Alert.prompt(
        title,
        showText ? description : "",
        [
          {
            text: t("modal.cancel"),
            style: "cancel",
            onPress: () => {
              formik.handleChange("folderName")("");
              onClose?.();
            },
          },
          {
            text: t("modal.ok"),
            onPress: (text) => {
              if (showInput && formik.isValid) {
                formik.setFieldValue("folderName", text);
                formik.handleSubmit();
              }
            },
            style: "default",
          },
        ],
        "plain-text",
        folderNameInitialvalue
      );
    }
  }, [visible]);

  return null;
};

export default CustomAlertPrompt;
