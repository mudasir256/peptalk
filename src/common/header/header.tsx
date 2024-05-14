import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageRequireSource,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInputField } from "../components/input/input";
import { Ionicons } from "@expo/vector-icons";
import { style } from "./styles";
import { HomeStackRoutes } from "../navigation/routes";
import { AddFolder } from "../../assets/svgs/svgIcons";
import AddFolderModal from "../components/modal/modal";

const items = [
  { label: "Title: A-Z", value: "Title: A-Z" },
  { label: "Title: Z-A", value: "Title: Z-A" },
  { label: "Date: Ascending", value: "Date: Ascending" },
  { label: "Date: Descending", value: "Date: Descending" },
];

type Props = {
  title: string;
  iconRight?: ImageRequireSource;
};

const Header = ({ title, iconRight }: Props) => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (item) => {
    setValue(item.value);
    setOpen(false);
  };

  const { navigate } = useNavigation();

  const onSearchPress = () => navigate(HomeStackRoutes.Search);

  const closeDropdown = () => setOpen(false);

  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
      <View style={style.container}>
        <View style={style.head}>
          <Text style={style.title}>{title}</Text>
          <TouchableOpacity
            style={style.dropdown}
            onPress={() => setOpen(!open)}
          >
            <Text style={style.selectedValue}>{value || "Sort"}</Text>
            <Ionicons name="caret-down" size={15} color="black" />
          </TouchableOpacity>
          {iconRight && (
            <TouchableOpacity
              // onPress={() => setModalVisible(true)}
              style={style.addFolder}
            >
              <AddFolder />
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
          placeholder="Search"
          searchIcon={true}
          rightIcon={<Ionicons name="mic" size={20} color={"gray"} />}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <AddFolderModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onAdd={(folderName) => {
              console.log("Adding folder:", folderName);
            }}
          />
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Header;
