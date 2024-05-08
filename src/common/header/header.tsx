import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageRequireSource } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputField } from '../components/input/input';
import { Ionicons } from "@expo/vector-icons";
import { style } from "./styles"
import { SearchStackRoutes } from '../navigation/routes';

const items = [
  { label: 'Title: A-Z', value: 'Title: A-Z' },
  { label: 'Title: Z-A', value: 'Title: Z-A' },
  { label: 'Date: Ascending', value: 'Date: Ascending' },
  { label: 'Date: Descending', value: 'Date: Desending ' }
]

type Props = {
  title: string
  iconRight?: ImageRequireSource
}

const Header = ({ title, iconRight }: Props) => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const handleSelect = (item) => {
    setValue(item.value);
    setOpen(false);
  };

  const { navigate } = useNavigation()

  const onSearchPress = () => navigate(SearchStackRoutes.SearchX)

  return (
    <View style={style.container}>
      <View style={style.head}>
        <Text style={style.title}>{title}</Text>
        <TouchableOpacity
          style={style.dropdown}
          onPress={() => setOpen(!open)}
        >
          <Text style={style.selectedValue}>{value || 'Sort'}</Text>
          <Ionicons name="caret-down" size={15} color="black" />
        </TouchableOpacity>
        {iconRight && <TouchableOpacity
          style={style.addFolder}
        >
          <Image source={iconRight} />
        </TouchableOpacity>}
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

      <TextInputField containerStyle={style.input} onPress={onSearchPress} placeholder="Search" />
    </View >
  );
};



export default Header;
