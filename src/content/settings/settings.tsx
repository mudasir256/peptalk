import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SectionList,
  Linking,
  Alert,
} from "react-native";
import { style } from "./style";
import { IMAGES } from "../../assets/images";
import { useTranslation } from "react-i18next";
import { SectionedData } from "./types";
import { HomeStackRoutes } from "../../common/navigation/routes";
import { useNavigation } from "@react-navigation/native";
import {
  apiSlice,
  useDeleteAccountMutation,
  useUserQuery,
} from "../../common/store/slice/api/slice";
import CustomModal from "../../common/components/modal/modal";
import { useSettingsData } from "./useSettingData";
import { useAppSelector } from "../../common/store/hooks";
import { selectAuthState } from "../../common/store/selectors";
import {
  logoutAction,
  setOnboarding,
} from "../../common/store/slice/authentication/slice";
import { useDispatch } from "react-redux";
import CustomModal2 from "../../common/components/modal/CustomModal2";
import Toast from "react-native-toast-message";

const SettingsScreen = () => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const { handleLogout, isLoadingLogout } = useSettingsData();
  const { data } = useUserQuery({});
  const { profile } = data || {};
  const { first_name = "" } = profile || {};
  let authStatus = useAppSelector(selectAuthState);
  const dispatch = useDispatch();

  const email = useAppSelector((state) => state.authentication);
  console.log("email", email);

  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const DATA: SectionedData[] = useMemo(
    () => [
      {
        title: t("settingsScreen.account"),
        data: [
          { title: first_name },
          {
            title: t("settingsScreen.loggedin") + first_name,
          },
          { title: t("settingsScreen.deleteAccount") },
          { title: t("settingsScreen.password"), showRevealIcon: true },
          { title: t("settingsScreen.logout") },
        ],
      },
      {
        title: t("settingsScreen.about"),
        data: [
          { title: t("settingsScreen.aboutMomBrain"), showRevealIcon: true },
          { title: t("settingsScreen.feedback"), showRevealIcon: true },
          { title: t("settingsScreen.leaveReview"), showRevealIcon: true },
          { title: t("settingsScreen.version"), isVersion: true },
        ],
      },
      {
        title: t("settingsScreen.support"),
        data: [{ title: t("settingsScreen.contact") }],
      },
      {
        title: t("settingsScreen.legal"),
        data: [{ title: t("settingsScreen.terms") }],
      },
    ],
    [data]
  );

  const logUserOut = () => {
    console.log("Pressed");
    // authStatus === AuthState.Authenticated;
    dispatch(apiSlice.util.resetApiState());
    dispatch(logoutAction());
    dispatch(setOnboarding(false));
    // setModalVisible(true);
  };

  const handleDeleteAccount = () => {
    deleteAccount({ email: "" })
      .then((data) => {
        console.log("data", data);
        logUserOut();
        Toast.show({
          type: t("mediaList.success"),
          text1: t("mediaList.successDeleteAccount"),
        });
      })
      .catch(() => {
        Toast.show({
          type: t("mediaList.error"),
          text1: t("mediaList.error"),
        });
      });
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Logout and delete account feature
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isDeleteAccountModalVisible, setisDeleteAccountModalVisible] =
    useState(false);

  const openLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };
  const closeLogoutModal = () => {
    setIsLogoutModalVisible(false);
  };
  const openDeleteAccountModal = () => {
    setisDeleteAccountModalVisible(true);
  };
  const closeDeleteAccountModal = () => {
    setisDeleteAccountModalVisible(false);
  };

  const handlePress = (item: { title: string }) => {
    if (item.title === t("settingsScreen.logout")) {
      openLogoutModal();
    }
    /*if (item.title === t("settingsScreen.deleteAccount")) {
      openDeleteAccountModal();
    }*/
    if (item.title === t("settingsScreen.terms")) {
      navigate(HomeStackRoutes.TermsOfUse);
    }
    if (item.title === t("settingsScreen.aboutMomBrain")) {
      navigate(HomeStackRoutes.About);
    }
    if (item.title === t("settingsScreen.password")) {
      navigate(HomeStackRoutes.Password);
    }
    if (item.title === t("settingsScreen.contact")) {
      Linking.openURL("mailto:contact@mombrain.net").catch((err) => {
        Alert.alert(t("settingsScreen.SigninMessage"));
      });
    }
    if (item.title === t("settingsScreen.leaveReview")) {
      Linking.openURL("https://apps.apple.com/").catch((err) => {
        Alert.alert(t("settingsScreen.leaveReviewError"));
      });
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={[style.itemContainer]}>
        <TouchableOpacity
          style={style.titleData}
          onPress={() => handlePress(item)}
        >
          <Text>{item.title}</Text>
        </TouchableOpacity>
        {item.showRevealIcon && (
          <Image source={IMAGES.rectangle5} style={style.icon} />
        )}
        {item.isVersion && (
          <Text style={style.version}>{t("settingsScreen.versions")}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={style.container}>
      <View style={style.head}>
        <Text style={style.title}>{t("settingsScreen.title")}</Text>
      </View>
      <SectionList
        style={style.list}
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={style.heading}>{title}</Text>
        )}
      />
      <View>
        <CustomModal
          visible={modalVisible && selectedValue !== null}
          onClose={handleCloseModal}
          title={
            selectedValue === "Logout"
              ? t("settingsScreen.logout")
              : t("modal.deleteAccount")
          }
          showText
          description={
            selectedValue === "Logout"
              ? t("modal.description")
              : t("modal.description1")
          }
        />
        <CustomModal2
          visible={isLogoutModalVisible}
          onClose={closeLogoutModal}
          title={t("settingsScreen.logout")}
          description={t("modal.description")}
          onPressOk={logUserOut}
          loading={false}
        />
        <CustomModal2
          visible={isDeleteAccountModalVisible}
          onClose={closeDeleteAccountModal}
          title={t("settingsScreen.deleteAccount")}
          description={t("modal.description1")}
          onPressOk={handleDeleteAccount}
          loading={false}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;
