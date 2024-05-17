import React, { useState } from "react";
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
import { UseDispatch } from "react-redux";

type Props = {
  title: string;
  visible?: boolean;
  onClose?: () => void;
  onAdd?: (value: string) => void;
  showInput?: boolean;
  showText?: boolean;
  description?: string;
  value?: string;
  dispatchAddFolder?: (folderName: string) => void;
  onPressOk?: (index: number, newName: string) => void;
};

const CustomModal = ({
  visible,
  onClose,
  title,
  showInput,
  showText,
  description,
  dispatchAddFolder,
  onPressOk,
}: Props) => {
  const { t } = useTranslation();
  const [folderName, setFolderName] = useState("");
  const handleCancel = () => {
    setFolderName("");
    onClose();
  };

  const handleAdd = () => {
    if (folderName.trim() !== "") {
      if (dispatchAddFolder) {
        dispatchAddFolder(folderName);
      }
      setFolderName("");
      onClose();
    }
    console.log("rename", folderName);
    // onPressOk();
  };

  return (
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
                    value={folderName}
                    onChangeText={setFolderName}
                  />
                </View>
              </>
            )}
            <View style={style.buttonContainer}>
              <PrimaryButton
                title={t("modal.cancel")}
                containerStyle={style.cancel}
                onPress={handleCancel}
              />
              <PrimaryButton
                title={t("modal.ok")}
                containerStyle={style.ok}
                onPress={handleAdd}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CustomModal;
