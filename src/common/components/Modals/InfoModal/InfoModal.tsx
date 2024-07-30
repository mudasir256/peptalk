import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../../theme/colors";
import { style } from "./style";

const InfoModal = ({
  visible,
  title,
  closeModal,
  description,
  buttonText,
}: {
  visible: boolean;
  title?: string;
  closeModal: () => void;
  description: string;
  buttonText?: string;
}) => {
  const { t } = useTranslation();

  const handleCancel = () => {
    closeModal();
  };

  return (
    <>
      {visible && (
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
                {title && <Text style={style.addNew}>{title}</Text>}
                {description && (
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "SF-Pro-Text-Medium",
                      lineHeight: 20,
                      color: COLORS.text,
                    }}
                  >
                    {description}
                  </Text>
                )}

                <View className=" self-stretch mt-4 items-center">
                  <PrimaryButtonFixed
                    title={buttonText ?? t("modal.ok")}
                    onPress={closeModal}
                  />
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      )}
    </>
  );
};

const PrimaryButtonFixed = memo(
  ({ title, onPress }: { title: string; onPress: () => void }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{ backgroundColor: COLORS.secondary }}
        className=" rounded-full h-[50px] px-[22px] justify-center items-center"
      >
        <Text
          className=" text-[17px] font-semibold"
          style={{ color: COLORS.text }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
);

export default InfoModal;
