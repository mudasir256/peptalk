import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Image, SectionList } from "react-native";
import { style } from "./style";
import { IMAGES } from "../../assets/images";
import { useTranslation } from "react-i18next";
import { SectionedData } from "./types";
import CustomModal from "../../common/components/modal/modal";
import { HomeStackRoutes } from "../../common/navigation/routes";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const { navigate } = useNavigation();

  const DATA: SectionedData[] = useMemo(
    () => [
      {
        title: t("settingsScreen.account"),
        data: [
          { title: t("settingsScreen.user") },
          { title: t("settingsScreen.loggedin") },
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
    []
  );

  const handleLogout = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handlePress = (item: { title: string }) => {
    if (item.title === "Logout") {
      setSelectedValue(item.title);
      handleLogout();
    }
    if (item.title === "Delete Account") {
      setSelectedValue(item.title);
      handleLogout();
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
