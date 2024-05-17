import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageRequireSource,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInputField } from "../components/input/input";
import { Ionicons } from "@expo/vector-icons";
import { style } from "./styles";
import { HomeStackRoutes } from "../navigation/routes";
import { AddFolder } from "../../assets/svgs/svgIcons";
import CustomModal from "../components/modal/modal";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addFolders } from "../store/slice/folders/slice";

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
  const { t } = useTranslation();
  const items = [
    { label: t("header.title1"), value: t("header.title1") },
    { label: t("header.title2"), value: t("header.title2") },
    { label: t("header.date1"), value: t("header.date1") },
    { label: t("header.date2"), value: t("header.date2") },
  ];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [folderName, setFolderName] = useState("");

  const dispatch = useDispatch();

  const handleSelect = (item) => {
    setValue(item.value);
    setOpen(false);
  };

  const { navigate } = useNavigation();

  const onSearchPress = () => navigate(HomeStackRoutes.Search);

  const closeDropdown = () => setOpen(false);

  const handleAdd = useCallback(
    (folderName: string) => {
      const folderData = {
        name: folderName,
        images: [],
      };
      dispatch(addFolders([folderData]));
      setModalVisible(false);
      setFolderName("");
    },
    [dispatch, folderName]
  );

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
              onPress={() => setModalVisible(true)}
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
          placeholder={t("header.search")}
          searchIcon={true}
          rightIcon={<Ionicons name="mic" size={20} color={"gray"} />}
        />
        <TouchableOpacity>
          <CustomModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            title={t("modal.titleModal")}
            showInput
            dispatchAddFolder={handleAdd}
          />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Header;
