import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Folder } from "./types";
import { SPACINGS } from "../../../common/theme/spacing";
import { styles } from "../../../common/theme/styles";
import FolderItemView from "./folderItemView";

type Props = {
  data: Folder[];
  handleDelete: (index: number) => void;
  handleRename: (index: number, newName: string) => void;
};

const FoldersList = ({ data, handleDelete, handleRename }: Props) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const closeDropdown = () => {
    setOpenDropdownIndex(null);
  };

  const renderItem = ({ item, index }: { item: Folder; index: number }) => (
    <View style={style.itemContainer}>
      <FolderItemView
        folder={item}
        handleDelete={() => handleDelete(index)}
        isOpen={openDropdownIndex === index}
        toggleDropdown={() => toggleDropdown(index)}
        updateFolder={handleRename}
      />
    </View>
  );

  const keyExtractor = (_item: Folder, index: number) => index.toString();

  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
      <View style={style.folderContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={2}
          contentContainerStyle={style.container}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </TouchableWithoutFeedback>
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
});

export default FoldersList;
