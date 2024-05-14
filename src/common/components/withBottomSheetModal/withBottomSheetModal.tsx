import React, { useRef } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import HomeFolder from "../../../common/components/homeFolder/homeFolder";
import PrimaryButton from "../../../common/components/primaryButton";
import { style } from "./style";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { CrossIcon } from "../../../assets/svgs/svgIcons";
import bottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet";

const foldersData = [
  "Dentist",
  "Doctor",
  "Haircuts",
  "Sports",
  "Outdoors",
  "Birthday Party",
];

const WithBottomSheetModal = ({ handleClosePress }) => {
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

export default WithBottomSheetModal;
