import React from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IMAGES } from "../../../../assets/images";
import { COLORS } from "../../../theme/colors";
import PrimaryButton from "../../primaryButton";
import { style } from "./style";

type DestructiveModalProps = {
  title: string;
  visible: boolean;
  setIsVisible: (a: boolean) => void;
  description?: string;
  onDelete: () => void;
  loading?: boolean;
  children?: React.ReactNode;
};

const DestructiveModal = ({
  visible,
  setIsVisible,
  title,
  description,
  onDelete,
  loading,
  children,
}: DestructiveModalProps) => {
  const { t } = useTranslation();

  const handleCancel = () => {
    //if (!loading) {
    setIsVisible(false);
    //}
  };

  const handlePress = () => {
    if (loading) {
      return;
    } else {
      onDelete();
    }
  };

  const opacity = loading ? 0.5 : 1;

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
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 20,
                  color: COLORS.text,
                  //marginBottom: 33,
                }}
                className=" self-stretch text-center mb-6"
              >
                {title}
              </Text>
              {description && (
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "SF-Pro-Text-Medium",
                    lineHeight: 20,
                    color: COLORS.text,
                    //paddingVertical: 16,
                  }}
                  className=" self-stretch text-center mb-[42px]"
                >
                  {description}
                </Text>
              )}

              {
                children
                /**
                 *
                 * Content of the modal
                 *
                 */
              }

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "100%",
                  gap: 16,
                }}
              >
                <PrimaryButton
                  title={t("modal.cancel")}
                  containerStyle={style.cancel}
                  onPress={handleCancel}
                />

                <TouchableOpacity
                  className="h-[50px] border-[2px] rounded-[25px] px-[12px] items-center justify-center flex-row"
                  style={{
                    gap: 16,
                    backgroundColor: COLORS.error,
                    borderColor: COLORS.error,
                    opacity,
                  }}
                  onPress={handlePress}
                >
                  <Image source={IMAGES.trash_v1} />
                  <Text
                    style={{
                      fontSize: 17,
                      color: COLORS.white,
                      textAlign: "center",
                      fontFamily: "SF-Pro-Text-Semibold",
                    }}
                  >
                    {t("dropDown.delete")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

export default DestructiveModal;
export type { DestructiveModalProps };
