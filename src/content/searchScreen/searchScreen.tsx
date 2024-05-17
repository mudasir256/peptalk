import { Text, View, Image, SectionList } from "react-native";
import React, { useState } from "react";
import { IMAGES } from "../../assets/images";
import { TextInputField } from "../../common/components/input/input";
import { Ionicons } from "@expo/vector-icons";
import { style } from "./style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../../common/theme/styles";
import { useTranslation } from "react-i18next";

const SearchScreen = ({ navigation: { goBack } }) => {
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  const DATA = [
    {
      title: "Video Suggestions",
      data: [
        {
          title: "Trip to the dentist",
          icon: IMAGES.rectangle4,
          type: "video",
        },
        { title: "Soccer Game", icon: IMAGES.rectangle4, type: "video" },
        { title: "Doctor Visit", icon: IMAGES.rectangle4, type: "video" },
      ],
    },
    {
      title: "Folder Suggestions",
      data: [
        { title: "Dentist", icon: IMAGES.folder, type: "folder" },
        { title: "Sports", icon: IMAGES.folder, type: "folder" },
        { title: "Doctor", icon: IMAGES.folder, type: "folder" },
      ],
    },
  ];

  const filteredData = DATA.map((item) => ({
    ...item,
    data: item.data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  const renderItem = ({ item }) => {
    return (
      <View style={[style.itemContainer]}>
        <Image source={item.icon} style={style.icon} />
        <Text style={style.title}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={{ ...style.container, ...styles.flex }}>
      <View style={style.headerContainer}>
        <TouchableOpacity style={style.back} onPress={() => goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
          <Text style={style.backbtn}>Back</Text>
        </TouchableOpacity>
        <TextInputField
          focusBorderColor="black"
          FocusBorderWidth={1}
          searchIcon
          value={search}
          onChangeText={(value) => setSearch(value)}
          containerStyle={style.search}
          placeholder={t("search.search")}
        />
      </View>
      <SectionList
        sections={filteredData}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={style.heading}>{title}</Text>
        )}
      />
    </View>
  );
};

export default SearchScreen;
