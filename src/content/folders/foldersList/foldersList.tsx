import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { Folder } from "./types";
import { SPACINGS } from "../../../common/theme/spacing";
import { styles } from "../../../common/theme/styles";
import FolderItemView from "./folderItemView";
import CustomModal from "../../../common/components/modal/modal";
import { useFoldersData } from "./useFolderListData";

const FoldersList = () => {
  const [showModal, setShowModal] = useState(false);
  const selectedFolder = useRef<Folder>(undefined);
  const [dropDownIndex, setDropdownIndex] = useState<number>();

  const {
    handleRenameFolder,
    handleDeleteFolder,
    deleting,
    isLoadingUpdate,
    isLoading,
    foldersList,
  } = useFoldersData();

  const onFolderNameUpdated = async (folderName: string) => {
    await handleRenameFolder(selectedFolder.current, folderName);
    setShowModal(false);
  };

  const handleUpdateFolder = (folder: Folder) => {
    selectedFolder.current = folder;
    setShowModal(true);
    setDropdownIndex(undefined);
  };

  const handleDelete = (folder: Folder) => {
    handleDeleteFolder(folder);
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
            onDeletePress={() => handleDelete(item)}
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
            data={foldersList}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            numColumns={2}
            contentContainerStyle={style.container}
            showsHorizontalScrollIndicator={false}
          />
          {showModal && (
            <CustomModal
              showInput
              visible={showModal}
              title={"Update Folder Name"}
              onClose={handleClose}
              onPressOk={onFolderNameUpdated}
              loading={isLoadingUpdate}
              selectedFolder={selectedFolder.current}
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
