import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInputField } from "../components/input/input";
import { Ionicons } from "@expo/vector-icons";
import { style } from "./styles";
import { HomeStackRoutes } from "../navigation/routes";
import { useTranslation } from "react-i18next";

type Props = {
  items?: { label: string; value: string }[];
  title: string;
  iconRight?: React.ReactNode;
  onIconRightPress?: () => void;
  handleSelect?: (selectedOption: string) => void;
};

const Header = ({
  items,
  title,
  iconRight,
  onIconRightPress,
  handleSelect,
}: Props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const { navigate } = useNavigation();

  const onSearchPress = () => navigate(HomeStackRoutes.Search);
  const closeDropdown = () => setOpen(false);
  const handleSelectOption = (selectedOption: string) => {
    handleSelect(selectedOption);
    closeDropdown();
  };
  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
      <View style={style.container}>
        <View style={style.head}>
          <Text style={style.title}>{title}</Text>
          <View style={style.btn}>
            <TouchableOpacity
              style={style.dropdown}
              onPress={() => setOpen(!open)}
            >
              <Text style={style.selectedValue}>
                {value || t("header.sort")}
              </Text>
              <Ionicons name="caret-down" size={15} color="black" />
            </TouchableOpacity>
            {iconRight && (
              <TouchableOpacity
                onPress={onIconRightPress}
                style={style.addFolder}
              >
                {iconRight}
              </TouchableOpacity>
            )}
            {open && (
              <View style={style.dropdownContent}>
                {items?.map((item) => (
                  <TouchableOpacity
                    key={item.value}
                    style={style.item}
                    onPress={() => handleSelectOption(item.value)}
                  >
                    <Text style={style.dropdownLabel}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
        <TextInputField
          onPress={onSearchPress}
          containerStyle={style.input}
          placeholder={t("header.search")}
          searchIcon={true}
          rightIcon={<Ionicons name="mic" size={20} color={"gray"} />}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Header;
