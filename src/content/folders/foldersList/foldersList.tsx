import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Folder } from "./types";
import FolderItemView from "./folderItemView";

type Props = {
  data: Folder[];
};

const FoldersList = ({ data }: Props) => {
  const renderItem = ({ item }: { item: Folder }) => (
    <View style={style.itemContainer}>
      <FolderItemView folder={item} />
    </View>
  );

  const keyExtractor = (_item: Folder, index: number) => index.toString();

  return (
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
  );
};

const style = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  itemContainer: {
    flex: 1,
    marginBottom: 10,
  },
  folderContainer: {
    zIndex: -1,
  },
});

export default FoldersList;
