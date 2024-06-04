import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Image, SectionList } from "react-native";
import { style } from "./style";
import { IMAGES } from "../../assets/images";
import { useTranslation } from "react-i18next";
import { SectionedData } from "./types";

import { HomeStackRoutes } from "../../common/navigation/routes";
import { useNavigation } from "@react-navigation/native";
import { useUserQuery } from "../../common/store/slice/api/slice";
import CustomModal from "../../common/components/modal/modal";
import { useSettingsData } from "./useSettingData";
import { AuthState } from "../../common/store/slice/authentication/types";
import { useAppSelector } from "../../common/store/hooks";
import { selectAuthState } from "../../common/store/selectors";
import {
  logoutAction,
  setAuthenticated,
} from "../../common/store/slice/authentication/slice";
import { useDispatch } from "react-redux";
const SettingsScreen = () => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const { handleLogout, isLoadingLogout } = useSettingsData();
  const { data } = useUserQuery({});
  const { profile: { first_name = "" } = {} } = data || {};
  let authStatus = useAppSelector(selectAuthState);
  const dispatch = useDispatch();
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
        title: t("settingsScreen.legel"),
        data: [{ title: t("settingsScreen.terms") }],
      },
    ],
    [data]
  );

  const handleLogoutpress = () => {
    // authStatus === AuthState.Authenticated;
    dispatch(logoutAction());
    // setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handlePress = (item: { title: string }) => {
    if (item.title === "Logout") {
      setSelectedValue(item.title);
      handleLogoutpress();
    }
    if (item.title === "Delete Account") {
      setSelectedValue(item.title);
    }
    if (item.title === "Terms of Use") {
      navigate(HomeStackRoutes.TermsOfUse);
    }
    if (item.title === "About Mom Brain") {
      navigate(HomeStackRoutes.About);
    }
    if (item.title === "Contact") {
      navigate(HomeStackRoutes.Contact);
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
        {item.isVersion && <Text style={style.version}>v.1.0</Text>}
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
      </View>
    </View>
  );
};

export default SettingsScreen;
