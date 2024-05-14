import React from "react";
import { View, Text } from "react-native";
import { style } from "./style";
import { Image, SectionList } from "react-native";
import { IMAGES } from "../../assets/images";

const DATA = [
  {
    title: "Account",
    data: [
      { title: "User" },
      { title: "Logged in as ksmith" },
      { title: "Delete Account" },
      { title: "Logout" },
    ],
  },
  {
    title: "About",
    data: [
      { title: "About Mom Brain" },
      { title: "Feedback" },
      { title: "Leave a Review" },
      { title: "Version" },
    ],
  },
  {
    title: "Support",
    data: [{ title: "Help" }],
  },
  {
    title: "Legal",
    data: [{ title: "Terms of Use" }],
  },
];

const renderItem = ({ item }) => {
  return (
    <View style={[style.itemContainer]}>
      <Text style={style.titleData}>{item.title}</Text>
      {(item.title === "About Mom Brain" ||
        item.title === "Feedback" ||
        item.title === "Leave a Review" ||
        item.title === "Terms of Use") && (
        <Image source={IMAGES.rectangle5} style={style.icon} />
      )}
      {item.title === "Version" && <Text style={style.version}>v.1.0</Text>}
    </View>
  );
};

const SettingsScreen = () => (
  <View style={style.container}>
    <View style={style.head}>
      <Text style={style.title}>Settings</Text>
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
  </View>
);

export default SettingsScreen;
