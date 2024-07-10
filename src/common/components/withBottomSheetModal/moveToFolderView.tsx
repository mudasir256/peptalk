import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import HomeFolder from "../homeFolder/homeFolder";
import PrimaryButton from "../primaryButton";
import { style } from "./style";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { CrossIcon } from "../../../assets/svgs/svgIcons";
import {
  useFoldersListQuery,
  useMoveFolderMutation,
} from "../../store/slice/api/slice";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

type Props = {
  handleClosePress: VoidFunction;
  onSavePress?: (folderId: string, name: string) => void;
  id?: string;
  title: string;
  fileUri?: string;
  cancelPressed?: boolean;
  foldersData?: any;
};

const MoveToFolderView = ({
  handleClosePress,
  id,
  title,
  onSavePress,
  foldersData,
}: Props) => {
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [moveFolder, { isLoading }] = useMoveFolderMutation();
  const { data } = useFoldersListQuery({});
  const { t } = useTranslation();
  const moveMediaToFolder = async () => {
    if (selectedFolderId) {
      const dataToUpdate = {
        folder_id: selectedFolderId,
      };
      try {
        await moveFolder({ id: id, data: dataToUpdate }).unwrap();
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

  const handleUploadMedia = async () => {
    Alert.prompt(
      t("alert.name"),
      "",
      async (name) => {
        if (name) {
          onSavePress(selectedFolderId, name);
          handleClosePress();
        }
      },
      "plain-text"
    );
  };
  return (
    <>
      <View style={style.container}>
        <BottomSheetView style={style.modalContainer}>
          <View style={style.head}>
            <Text style={style.move}>{title}</Text>
            <TouchableOpacity
              onPress={handleClosePress}
              style={style.iconContainer}
            >
              <CrossIcon />
            </TouchableOpacity>
          </View>
          {data?.results && (
            <FlatList
              data={data?.results}
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
          )}
        </BottomSheetView>
      </View>
      <View style={style.buttonContainer}>
        <PrimaryButton
          title={title === "Save" ? t("common.save") : t("common.moveFolder")}
          containerStyle={style.button}
          onPress={title === "Save" ? handleUploadMedia : moveMediaToFolder}
          loading={isLoading}
        />
      </View>
    </>
  );
};

export default MoveToFolderView;
