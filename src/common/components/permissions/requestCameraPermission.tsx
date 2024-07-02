import { useEffect } from "react";
import { Alert, Linking } from "react-native";
import { useCameraPermission } from "react-native-vision-camera";
import { useTranslation } from "react-i18next";

const RequestCameraPermission = () => {
  const { hasPermission } = useCameraPermission();
  const { t } = useTranslation();

  useEffect(() => {
    const checkPermission = async () => {
      if (!hasPermission) {
        Alert.alert(
          t("permission.permission"),
          t("permission.permissionmessage"),
          [
            {
              text: "go to settings",
              onPress: () => {
                Linking.openSettings();
              },
            },
          ],
          { cancelable: true }
        );
      }
    };
    checkPermission();
  }, [hasPermission, t]);

  return null;
};

export default RequestCameraPermission;
