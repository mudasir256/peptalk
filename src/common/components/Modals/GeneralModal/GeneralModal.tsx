import React from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  View,
} from "react-native";
import PrimaryButton from "../../primaryButton";
import { style } from "./style";

type GeneralModalProps = {
  title: string;
  visible?: boolean;
  onClose: () => void;
  description?: string;
  onPressOk: () => void;
  id?: number;
  loading?: boolean;
  showCancel?: boolean;
  children?: React.ReactNode;
};

const GeneralModal = ({
  visible,
  onClose,
  title,
  description,
  onPressOk,
  id,
  loading,
  showCancel = true,
  children,
}: GeneralModalProps) => {
  const { t } = useTranslation();

  const handleCancel = () => {
    onClose();
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
              {description && (
                <Text style={style.description}>{description}</Text>
              )}

              {
                children
                /**
                 *
                 * Content of the modal
                 *
                 */
              }

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
                  //disabled={nameError || lengthError}
                  containerStyle={style.ok}
                  onPress={onPressOk}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

export default GeneralModal;
export type { GeneralModalProps };
