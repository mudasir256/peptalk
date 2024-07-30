import React, { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomModal from "../../../common/components/modal/modal";
import { COLORS } from "../../../common/theme/colors";
import { SPACINGS } from "../../../common/theme/spacing";
import { styles } from "../../../common/theme/styles";
import FolderItemView from "./folderItemView";
import { Folder } from "./types";
import { useFoldersData } from "./useFolderListData";
import { APIFolderType } from "../../../common/store/slice/api/types";

type Props = {
  data?: APIFolderType[];
  refetch: () => Promise<any>;
  isFetching: boolean;
};
const FoldersList = ({ data, refetch, isFetching: inputIsFetching }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const selectedFolder = useRef<Folder>(undefined);
  const { t } = useTranslation();
  const [dropDownIndex, setDropdownIndex] = useState<number>();

  const {
    handleRenameFolder,
    handleDeleteFolder,
    deleting,
    isLoadingUpdate,
    isFetching: _isFetching,
    isLoading,
  } = useFoldersData();

  const isFetching = _isFetching || inputIsFetching;

  const onRefresh = useCallback(() => {
    refetch();
  }, []);

  const onFolderNameUpdated = async (folderName: string) => {
    await handleRenameFolder(selectedFolder.current, folderName);
    setShowModal(false);
    refetch();
  };

  const handleUpdateFolder = (folder: Folder) => {
    selectedFolder.current = folder;
    setShowModal(true);
    setDropdownIndex(undefined);
    refetch();
  };

  const handleDelete = (folder: Folder) => {
    /*Alert.alert(
      t("alert.deletefolder"),
      `${t("alert.areyousure")} "${folder.folder_name}"?`,
      [
        {
          text: t("signUpScreen.cancel"),
          style: "cancel",
        },
        {
          text: t("dropDown.delete"),
          style: "destructive",
          onPress: () => {
            handleDeleteFolder(folder);
            refetch();
          },
        },
      ],
      { cancelable: false }
    );*/
    setDropdownIndex(undefined);
  };

  const handleClose = () => setShowModal(false);

  const renderItem = ({ item, index }) => (
    <View style={style.itemContainer}>
      <TouchableWithoutFeedback onPress={() => setDropdownIndex(undefined)}>
        <View>
          <FolderItemView
            showDropdown={dropDownIndex === index}
            folder={item}
            onRenamePress={() => handleUpdateFolder(item)}
            handleDeleteFolder={() => handleDeleteFolder(item)}
            onEllipsesPress={() => setDropdownIndex(index)}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  const keyExtractor = (_item, index) => index.toString();

  return (
    <View style={style.folderContainer}>
      {isLoading ? (
        <ActivityIndicator style={style.activityIndicator} size={"large"} />
      ) : (
        <>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            numColumns={2}
            contentContainerStyle={style.container}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => {
              return (
                <View style={[styles.center, styles.flex]}>
                  <Text>{t("common.nodata")}</Text>
                </View>
              );
            }}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={onRefresh}
                colors={[COLORS.shadow, COLORS.shadow]}
                tintColor={COLORS.shadow}
                titleColor={COLORS.shadow}
              />
            }
          />

          {showModal && (
            <CustomModal
              showInput
              visible={showModal}
              title={t("modal.updatefoldername")}
              onClose={handleClose}
              onPressOk={onFolderNameUpdated}
              loading={isLoadingUpdate}
              selectedFolder={selectedFolder.current}
              //key={`${showModal}`}
            />
          )}
          {deleting && (
            <ActivityIndicator style={style.activityIndicator} size={"large"} />
          )}
        </>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingBottom: SPACINGS.sm,
    flexGrow: 1,
  },
  itemContainer: {
    marginBottom: SPACINGS.sm,
    width: "50%",
  },
  folderContainer: {
    zIndex: -1,
    ...styles.flex,
  },
  activityIndicator: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default FoldersList;
