import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Folders } from "../../../assets/svgs/svgIcons";
import { COLORS } from "../../theme/colors";
import { SPACINGS } from "../../theme/spacing";
import { Ionicons } from "@expo/vector-icons";

const HomeFolder = ({ name }) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.head}>
      <View style={styles.folder}>
        <Folders />
        <Text style={styles.move}>{name}</Text>
      </View>
      <TouchableOpacity onPress={toggleCheckbox}>
        <View
          style={[
            styles.checkboxContainer,
            { borderColor: isChecked ? "black" : "#B3AFAF" },
          ]}
        >
          {isChecked && <Ionicons name="checkmark" size={22} color="black" />}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  head: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SPACINGS.md,
  },
  folder: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  move: {
    marginLeft: 5,
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 22,
    color: COLORS.text,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: SPACINGS.sm,
  },
});

export default HomeFolder;
