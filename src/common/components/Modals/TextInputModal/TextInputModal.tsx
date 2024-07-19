import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { TextFormikType } from "../../../formiks/textFormik";
import { COLORS } from "../../../theme/colors";
import { TextInputField } from "../../input/input";
import GeneralModal, { GeneralModalProps } from "../GeneralModal/GeneralModal";
import { style } from "./style";

type TextInputModalProps = {
  formik: TextFormikType;
  defaultValue: string;
  placeholder: string;
} & GeneralModalProps;
//&TextFormikConfigProps;

const TextInputModal = memo(
  ({ formik, defaultValue, placeholder, ...props }: TextInputModalProps) => {
    const { t } = useTranslation();

    return (
      <GeneralModal {...props}>
        <>
          {/*<Text style={style.modalTitle}>{t("modal.folderName")}</Text>*/}
          <View>
            <TextInputField
              placeholder={placeholder}
              containerStyle={{ backgroundColor: COLORS.inputbg }}
              onChangeText={formik.handleChange("textValue")}
              defaultValue={defaultValue}
            />
          </View>
          <View>
            {formik.errors.textValue && (
              <Text style={style.error}>{formik.errors.textValue}</Text>
            )}
          </View>
        </>
      </GeneralModal>
    );
  }
);

export default TextInputModal;
