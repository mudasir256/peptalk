import React, { ReactNode, useState } from "react";
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
import { AddFolder } from "../../assets/svgs/svgIcons";
import { useTranslation } from "react-i18next";
import CustomModal from "../components/modal/modal";
import { useAddFolderMutationMutation } from "../store/slice/api/slice";
import Toast from "react-native-toast-message";

const items = [
  { label: "Title: A-Z", value: "Title: A-Z" },
  { label: "Title: Z-A", value: "Title: Z-A" },
  { label: "Date: Ascending", value: "Date: Ascending" },
  { label: "Date: Descending", value: "Date: Descending" },
];

type Props = {
  title: string;
  iconRight?: ReactNode;
  onIconRightPress?: VoidFunction;
};

const Header = ({ title, iconRight, onIconRightPress }: Props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { navigate } = useNavigation();

  const handleSelect = (item: { label?: string; value: any }) => {
    setValue(item.value);
    setOpen(false);
  };

  const onSearchPress = () => navigate(HomeStackRoutes.Search);

  const closeDropdown = () => setOpen(false);
  const closeModal = () => setModalVisible(false);

  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
      <View style={style.container}>
        <View style={style.head}>
          <Text style={style.title}>{title}</Text>
          <TouchableOpacity
            style={style.dropdown}
            onPress={() => setOpen(!open)}
          >
            <Text style={style.selectedValue}>{value || t("header.sort")}</Text>
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
              {items.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[style.item]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={style.dropdownLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
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
