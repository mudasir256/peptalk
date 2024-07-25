import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  Linking,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { IMAGES } from "../../assets/images";
import CustomModal from "../../common/components/modal/modal";
import YesOrNoModal from "../../common/components/Modals/YesOrNoModal.tsx/YesOrNoModal";
import { appLinks } from "../../common/constants/links";
import { HomeStackRoutes } from "../../common/navigation/routes";
import { useAppSelector } from "../../common/store/hooks";
import { selectAuthState } from "../../common/store/selectors";
import {
  apiSlice,
  useDeleteAccountMutation,
  useUserQuery,
} from "../../common/store/slice/api/slice";
import {
  logoutAction,
  setOnboarding,
} from "../../common/store/slice/authentication/slice";
import { style } from "./style";
import { SectionedData } from "./types";
import { useSettingsData } from "./useSettingData";

const SettingsScreen = () => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const { handleLogout, isLoadingLogout } = useSettingsData();
  const { data } = useUserQuery({});
  const { profile, email } = data || {};
  const { first_name = "", last_name = "" } = profile || {};
  let authStatus = useAppSelector(selectAuthState);
  const dispatch = useDispatch();

  // const email = useAppSelector((state) => state.authentication);
  // console.log("email", data);

  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const DATA: SectionedData[] = useMemo(
    () => [
      {
        title: t("settingsScreen.account"),
        data: [
          { title: email },
          {
            title: t("settingsScreen.loggedin") + first_name + " " + last_name,
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
      //navigate(HomeStackRoutes.TermsOfUse);
      Linking.openURL(appLinks.termsOfUseLink).catch((err) => {
        Alert.alert(t("error.Linking"));
      });
    }
    if (item.title === t("settingsScreen.aboutMomBrain")) {
      navigate(HomeStackRoutes.About);
    }
    if (item.title === t("settingsScreen.password")) {
      navigate(HomeStackRoutes.Password);
    }
    if (item.title === t("settingsScreen.contact")) {
      Linking.openURL("mailto:contact@mombrain.net").catch((err) => {
        console.log(`Unable to open mailto link: ${err}`);
      });
    }
    if (item.title === t("settingsScreen.leaveReview")) {
      Linking.openURL(appLinks.appStoreLink).catch((err) => {
        Alert.alert(t("error.Linking"));
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
          key={`${modalVisible}`}
        />
        <YesOrNoModal
          visible={isLogoutModalVisible}
          onClose={closeLogoutModal}
          title={t("settingsScreen.logout")}
          description={t("modal.description")}
          onPressOk={logUserOut}
          loading={false}
        />
        <YesOrNoModal
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
