import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { CrossIcon } from "../../../assets/svgs/svgIcons";
import { useTextFormikConfig } from "../../formiks/textFormik";
import {
  useFoldersListQuery,
  useMoveFolderMutation,
} from "../../store/slice/api/slice";
import HomeFolder from "../homeFolder/homeFolder";
import TextInputModal from "../Modals/TextInputModal/TextInputModal";
import PrimaryButton from "../primaryButton";
import { style } from "./style";

type Props = {
  handleClosePress: VoidFunction;
  onSavePress?: (folderId: string, name: string) => void;
  id?: string;
  title: string;
  fileUri?: string;
  cancelPressed?: boolean;
  foldersData?: any;
  openAddFolderPopup?: () => void;
  selectedFolderId: string;
  setSelectedFolderId: React.Dispatch<React.SetStateAction<string>>;
};

const MoveToFolderView = ({
  handleClosePress,
  id,
  title,
  onSavePress,
  foldersData,
  openAddFolderPopup,
  selectedFolderId,
  setSelectedFolderId,
}: Props) => {
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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const formikConfig = useTextFormikConfig({
    initialValue: "",
    maxLength: 50,
    maxLengthError: t("yup.stringMax50"),
    onPressOk: async (name) => {
      console.log("name", name);
      if (name) {
        console.log("found name");
        onSavePress(selectedFolderId, name);
        handleClosePress();
      }
    },
  });

  const formik = useFormik(formikConfig);

  const handleUploadMedia = async () => {
    setIsModalVisible(true);
    /*Alert.prompt(
      t("alert.name"),
      "",
      async (name) => {
        if (name) {
          onSavePress(selectedFolderId, name);
          handleClosePress();
        }
      },
      "plain-text"
    );*/
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
      {selectedFolderId && (
        <View style={style.buttonContainer}>
          <View className="flex-1 items-center">
            <PrimaryButton
              title={
                title === "Save" ? t("common.save") : t("common.moveFolder")
              }
              containerStyle={style.button}
              onPress={title === "Save" ? handleUploadMedia : moveMediaToFolder}
              loading={isLoading}
            />
          </View>
        </View>
      )}

      {openAddFolderPopup && (
        <View style={style.buttonContainer}>
          <View className="flex-1 items-center">
            <PrimaryButton
              title={t("modal.addFolder")}
              containerStyle={style.button}
              onPress={openAddFolderPopup}
            />
          </View>
        </View>
      )}
      <TextInputModal
        formik={formik}
        defaultValue=""
        placeholder={t("placeholder.videoName")}
        title={t("alert.name")}
        onClose={() => {
          setIsModalVisible(false);
        }}
        onPressOk={formik.handleSubmit}
        visible={isModalVisible}
      />
    </>
  );
};

export default MoveToFolderView;
