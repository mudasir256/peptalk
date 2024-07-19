import React, { useState, useEffect, useCallback } from "react";
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
import {
  useFoldersListQuery,
  useGetSearchQuery,
} from "../../common/store/slice/api/slice";
import { IMAGES } from "../../assets/images";
import { style } from "./style";
import { styles } from "../../common/theme/styles";
import {
  FolderStackRoutes,
  HomeStackRoutes,
} from "../../common/navigation/routes";
import { APIFolderType } from "../../common/store/slice/api/types";
import { useIsFocused } from "@react-navigation/native";

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  const { data, isLoading, refetch: refetchMedia } = useGetSearchQuery(search);

  const {
    data: foldersResponse,
    isFetching: isFoldersFetching,
    refetch: refetchFolders,
  } = useFoldersListQuery({ search });

  const refetch = useCallback(() => {
    refetchMedia();
    refetchFolders();
  }, [refetchMedia, refetchFolders]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const foldersData = foldersResponse?.results ?? [];

  //console.log("foldersData", foldersData);

  //console.log(data);

  useEffect(() => {}, [search]);

  const handleVideoPress = (videoUrl) => {
    navigation.navigate(HomeStackRoutes.MediaScreen, { video: videoUrl });
  };
  const handleFolderPress = (folderId, folderName) => {
    navigation.navigate(FolderStackRoutes.FolderItems, {
      foldername: folderName,
      folderId: folderId,
    });
  };
  const renderItem = ({ item, section, index }) => {
    if (section.index === 0) {
      return (
        <TouchableOpacity
          style={style.itemContainer}
          onPress={() => handleVideoPress(item.media)}
        >
          <Image source={IMAGES.rectangle4} style={style.icon} />
          <Text style={style.title}>{item.media_name}</Text>
        </TouchableOpacity>
      );
    } else {
      //console.log("second item", item);

      const folderItem: APIFolderType = item;

      return (
        <TouchableOpacity
          style={style.itemContainer}
          onPress={() =>
            handleFolderPress(folderItem.id, folderItem.folder_name)
          }
        >
          <Image source={IMAGES.folder} style={style.icon} />
          <Text style={style.title}>{folderItem.folder_name}</Text>
        </TouchableOpacity>
      );
    }
  };

  if (isLoading) {
    return (
      <View style={styles.flexCenter}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.flexCenter}>
        <Text>{t("search.nodata")}</Text>
      </View>
    );
  }

  const filteredData = [
    {
      title: t("search.videosuggestions"),
      data: data.results.filter((item) => item.media_name).slice(0, 3),
      index: 0,
    },
    {
      title: t("search.foldersuggestions"),
      data: foldersData.slice(0, 3),
      index: 1,
    },
  ];

  //console.log("0", filteredData[0]);
  //console.log("1", filteredData[1]);

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
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={style.heading}>{title}</Text>
        )}
      />
    </View>
  );
};

export default SearchScreen;
