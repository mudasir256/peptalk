import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { TextInputField } from "../../common/components/input/input";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useGetSearchQuery } from "../../common/store/slice/api/slice";
import { IMAGES } from "../../assets/images";
import { style } from "./style";
import { styles } from "../../common/theme/styles";
import { useNavigation } from "@react-navigation/native";
import {
  CameraStackRoutes,
  FolderStackRoutes,
} from "../../common/navigation/routes";

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  const { data, isLoading } = useGetSearchQuery(search);
  const { navigate } = useNavigation();

  useEffect(() => {}, [search]);

  const handleVideoPress = (videoUrl: string) => {
    navigation.navigate(CameraStackRoutes.VideoScreen, { video: videoUrl });
  };
  const handleFolderPress = (folderId: number, folderName: string) => {
    navigate(FolderStackRoutes.FolderItems, {
      foldername: folderName,
      folderId: folderId,
    });
  };
  const renderItem = ({ item, section }) => {
    if (section.title === "Video Suggestions") {
      return (
        <TouchableOpacity
          style={style.itemContainer}
          onPress={() => handleVideoPress(item.media)}
        >
          <Image source={IMAGES.rectangle4} style={style.icon} />
          <Text style={style.title}>{item.media_name}</Text>
        </TouchableOpacity>
      );
    } else if (section.title === "Folder Suggestions") {
      return (
        <TouchableOpacity
          style={style.itemContainer}
          onPress={() =>
            handleFolderPress(item.folder.id, item.folder.folder_name)
          }
        >
          <Image source={IMAGES.folder} style={style.icon} />
          <Text style={style.title}>{item.folder.folder_name}</Text>
        </TouchableOpacity>
      );
    }
  };

  if (isLoading) {
    return (
      <View style={styles.flex}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.flex}>
        <Text>No data found</Text>
      </View>
    );
  }

  const filteredData = [
    {
      title: "Video Suggestions",
      data: data.results.filter((item) => item.media_name),
    },
    {
      title: "Folder Suggestions",
      data: data.results.filter(
        (item) => item.folder && item.folder.folder_name
      ),
    },
  ];

  return (
    <View style={[style.container, styles.flex]}>
      <View style={style.headerContainer}>
        <TouchableOpacity
          style={style.back}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
          <Text style={style.backbtn}>{t("common.back")}</Text>
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
        keyExtractor={(item, index) => item.id || index.toString()} // Ensure each item has a unique key
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={style.heading}>{title}</Text>
        )}
      />
    </View>
  );
};

export default SearchScreen;
