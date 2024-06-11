import React, { useRef } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import HomeFolder from "../homeFolder/homeFolder";
import PrimaryButton from "../primaryButton";
import { style } from "./style";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { CrossIcon } from "../../../assets/svgs/svgIcons";
import { Folder } from "../../../content/folders/foldersList/types";
import { useFoldersData } from "../../../content/folders/foldersList/useFolderListData";

type Props = {
  handleClosePress: VoidFunction;
};
const MoveToFolderView = ({ handleClosePress }: Props) => {
  const { data } = useFoldersData();
  console.log("addingfolder", data);

  if (!data) {
    return null;
  }
  return (
    <>
      <View style={style.container}>
        <BottomSheetView style={style.modalContainer}>
          <View style={style.head}>
            <Text style={style.move}>Move</Text>
            <TouchableOpacity
              onPress={handleClosePress}
              style={style.iconContainer}
            >
              <CrossIcon />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data.results}
            renderItem={({ item }) => <HomeFolder name={item.folder_name} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={style.folder}
          />
        </BottomSheetView>
      </View>
      <View style={style.buttonContainer}>
        <PrimaryButton title={"Folder"} containerStyle={style.button} />
      </View>
    </>
  );
};

export default MoveToFolderView;
