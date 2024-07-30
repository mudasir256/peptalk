import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Linking, Alert } from "react-native";
import { Camera } from "react-native-vision-camera";
import { useTranslation } from "react-i18next";
import YesOrNoModal from "../Modals/YesOrNoModal.tsx/YesOrNoModal";

const CameraPermissionHandler = ({ children }) => {
  const { t } = useTranslation();
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [initialPermissionsRequest, setInitialPermissionsRequest] =
    useState(true);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const cameraPermission = await Camera.requestCameraPermission();
        const microphonePermission = await Camera.requestMicrophonePermission();
        if (
          cameraPermission === "granted" &&
          microphonePermission === "granted"
        ) {
          setPermissionsGranted(true);
        } else {
          setPermissionsGranted(false);
        }
        setInitialPermissionsRequest(false);
      } catch (error) {
        console.error("Error requesting permissions:", error);
      }
    };

    requestPermissions();
  }, []);

  const goToSettings = () => {
    Linking.openSettings();
  };

  const [
    isCameraPermissionErrorModalVisible,
    setIsCameraPermissionErrorModalVisible,
  ] = useState(false);
  const showCameraPermissionErrorModal = () => {
    setIsCameraPermissionErrorModalVisible(true);
  };
  const closeCameraPermissionErrorModal = () => {
    setIsCameraPermissionErrorModalVisible(false);
  };
  const onOressOkForCameraPermissionModal = () => {
    setIsCameraPermissionErrorModalVisible(false);
    goToSettings();
  };

  if (initialPermissionsRequest) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!permissionsGranted) {
    showCameraPermissionErrorModal();
    /*Alert.alert(
      t("alert.permissionrequired"),
      t("alert.camerapermission"),
      [
        {
          text: t("modal.cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: t("bottomTab.settings"), onPress: goToSettings },
      ],
      { cancelable: false }
    );*/

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        {isCameraPermissionErrorModalVisible && (
          <YesOrNoModal
            title={t("alert.permissionrequired")}
            description={t("alert.camerapermission")}
            onClose={closeCameraPermissionErrorModal}
            onPressOk={onOressOkForCameraPermissionModal}
            visible={isCameraPermissionErrorModalVisible}
            okButtonText={t("bottomTab.settings")}
            cancelButtonText={t("bottomTab.settings")}
          />
        )}
      </View>
    );
  }

  return <>{children}</>;
};

export default CameraPermissionHandler;
