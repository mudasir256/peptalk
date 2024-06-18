import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import HomeFolder from "../homeFolder/homeFolder";
import PrimaryButton from "../primaryButton";
import { style } from "./style";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { CrossIcon } from "../../../assets/svgs/svgIcons";
import { useFoldersData } from "../../../content/folders/foldersList/useFolderListData";
import { useMoveFolderMutation } from "../../store/slice/api/slice";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

type Props = {
  handleClosePress: VoidFunction;
  id?: string;
};
const MoveToFolderView = ({ handleClosePress, id }: Props) => {
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [moveFolder, { isLoading }] = useMoveFolderMutation();
  const { data: foldersData } = useFoldersData();
  const { t } = useTranslation();
  const moveMediaToFolder = async () => {
    if (selectedFolderId) {
      const dataToUpdate = {
        folder_id: selectedFolderId,
      };
      try {
        await moveFolder({ id: id, data: dataToUpdate });
        handleClosePress();
        Toast.show({
          type: t("mediaList.success"),
          text1: t("mediaList.movedsuccessfully"),
        });
      } catch (err) {
        Toast.show({
          type: t("mediaList.error"),
          text1: t("mediaList.erroradding"),
        });
      }
    }
  };

  if (!foldersData) {
    return null;
  }

  return (
    <>
      <View style={style.container}>
        <BottomSheetView style={style.modalContainer}>
          <View style={style.head}>
            <Text style={style.move}>{t("common.move")}</Text>
            <TouchableOpacity
              onPress={handleClosePress}
              style={style.iconContainer}
            >
              <CrossIcon />
            </TouchableOpacity>
          </View>
          <FlatList
            data={foldersData.results}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedFolderId(item.id)}>
                <HomeFolder
                  name={item.folder_name}
                  isChecked={selectedFolderId === item.id}
                  onCheckboxToggle={(id) => setSelectedFolderId(id)}
                  id={item.id}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={style.folder}
          />
        </BottomSheetView>
      </View>
      <View style={style.buttonContainer}>
        <PrimaryButton
          title={t("common.moveFolder")}
          containerStyle={style.button}
          onPress={moveMediaToFolder}
          loading={isLoading}
        />
      </View>
    </>
  );
};

export default MoveToFolderView;
