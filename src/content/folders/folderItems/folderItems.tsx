import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "../../../common/theme/styles";
import Header from "../../../common/header/header";
import FolderItemsListView from "../../home/folderItemsList/FolderItemsListView";
import { ImportIcon } from "../../../assets/svgs/svgIcons";
import { StyleSheet } from "react-native";
import { SPACINGS } from "../../../common/theme/spacing";
import { ButtonTextPrimary } from "../../../common/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../common/theme/colors";
import { useTranslation } from "react-i18next";
import { useGetFoldersListByIdQuery } from "../../../common/store/slice/api/slice";

const FolderItems = ({ route, navigation: { goBack } }) => {
  const { t } = useTranslation();

  const foldername = route.params?.foldername;
  const folderId = route.params.folderId;
  const { data: foldersData, isLoading } = useGetFoldersListByIdQuery(folderId);
  return (
    <>
      <TouchableOpacity style={style.back} onPress={() => goBack()}>
        <Ionicons name="chevron-back" size={24} color="black" />
        <Text style={style.backbtn}>{t("common.back")}</Text>
      </TouchableOpacity>
      <View style={styles.flex}>
        <Header title={foldername} iconRight={<ImportIcon />} />
        <FolderItemsListView data={foldersData} loadings={isLoading} />
      </View>
    </>
  );
};

export default FolderItems;
export const style = StyleSheet.create({
  back: {
    ...styles.alignCenter,
    ...styles.row,
    paddingTop: SPACINGS.sm,
    backgroundColor: COLORS.header,
  },
  backbtn: {
    ...ButtonTextPrimary,
  },
});
