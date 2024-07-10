import React, { useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInputField } from "../input/input";
import { COLORS } from "../../theme/colors";
import PrimaryButton from "../primaryButton";
import { style } from "./style";
import { useTranslation } from "react-i18next";
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
}: Props) => {
  const { t } = useTranslation();
  const [nameError, setNameError] = useState(false);
  const [lengthError, setLengthError] = useState(false);
  const inputName = useRef(selectedFolder?.folder_name);

  const handleCancel = () => {
    inputName.current = "";
    setNameError(false);
    setLengthError(false);
    onClose?.();
  };
  const handleOKPress = () => {
    if (!inputName.current) {
      setNameError(true);
      return;
    }

    if (inputName.current.length > 15) {
      setLengthError(true);
      return;
    }

    onPressOk?.(inputName.current);
    inputName.current = "";
    setNameError(false);
    setLengthError(false);
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={handleCancel}
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
                  <Text style={style.modalTitle}>{t("modal.folderName")}</Text>
                  <View>
                    <TextInputField
                      placeholder={t("modal.addFolder")}
                      containerStyle={{ backgroundColor: COLORS.inputbg }}
                      onChangeText={(text) => {
                        inputName.current = text;
                        if (text.length <= 15) {
                          setLengthError(false);
                        }
                        if (text.trim().length > 0) {
                          setNameError(false);
                        }
                      }}
                      defaultValue={inputName.current}
                    />
                  </View>
                  <View>
                    {nameError && (
                      <Text style={style.error}>{t("alert.entername")}</Text>
                    )}
                    {lengthError && (
                      <Text style={style.error}>{t("alert.nameLength")}</Text>
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
                  disabled={nameError || lengthError}
                  containerStyle={style.ok}
                  onPress={handleOKPress}
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
