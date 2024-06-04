import React, { useRef } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import HomeFolder from "../homeFolder/homeFolder";
import PrimaryButton from "../primaryButton";
import { style } from "./style";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { CrossIcon } from "../../../assets/svgs/svgIcons";
import bottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet";

//TODO 4: Change with folders list
const foldersData = [
  "Dentist",
  "Doctor",
  "Haircuts",
  "Sports",
  "Outdoors",
  "Birthday Party",
];

const MoveToFolderView = ({ handleClosePress }) => {
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
            data={foldersData}
            renderItem={({ item }) => <HomeFolder name={item} />}
            keyExtractor={(index) => index.toString()}
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
