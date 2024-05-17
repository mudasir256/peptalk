import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../../theme/colors";
import { NormalFont } from "../../../theme/typography";
import { SPACINGS } from "../../../theme/spacing";

type Option = {
  label: string;
  value: any;
};

type DropdownProps = {
  options: Option[];
  onSelect: (value: any) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  return (
    <View style={styles.dropdownContainer}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            index !== options.length - 1 && styles.optionWithBorder,
          ]}
          onPress={() => onSelect(option.value)}
        >
          <View style={styles.label}>
            <Text style={styles.optionText}>{option.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    position: "absolute",
    bottom: SPACINGS.lg,
    right: SPACINGS.rg,
    backgroundColor: COLORS.white,
    borderRadius: SPACINGS.md,
    borderWidth: 1,
    borderColor: COLORS.dropDownBorder,
  },
  optionText: {
    ...NormalFont,
  },
  option: {
    height: 44,
    width: 97,
  },
  optionWithBorder: {
    borderBottomWidth: 1,
    borderColor: COLORS.dropDownBorder,
  },
  label: {
    paddingVertical: 10,
    paddingHorizontal: SPACINGS.lg,
  },
});

export default Dropdown;
