import { Text, View, Image, SectionList } from 'react-native';
import React from 'react';
import { IMAGES } from '../../assets/images';
import { TextInputField } from '../../common/components/input/input';
import { Ionicons } from "@expo/vector-icons";
import { style } from './style';

const SearchScreen = () => {
  const DATA = [
    {
      title: 'Video Suggestions',
      data: [
        { title: 'Trip to the dentist', icon: (IMAGES.rectangle4), type: 'video' },
        { title: 'Soccer Game', icon: (IMAGES.rectangle4), type: 'video' },
        { title: 'Doctor Visit', icon: (IMAGES.rectangle4), type: 'video' },
      ],
    },
    {
      title: 'Folder Suggestions',
      data: [
        { title: 'Dentist', icon: (IMAGES.folder), type: 'folder' },
        { title: 'Sports', icon: (IMAGES.folder), type: 'folder' },
        { title: 'Doctor', icon: (IMAGES.folder), type: 'folder' },
      ],
    },
  ];
  const renderItem = ({ item, index }) => {

    return (
      <View style={[style.itemContainer,]}>
        <Image source={item.icon} style={style.icon} />
        <Text style={style.title}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={style.container}>
      <View style={style.headerContainer}>
        <View style={style.back}>
          <Ionicons name="chevron-back" size={24} color="black" />
          <Text style={style.backbtn} >Back</Text>
        </View>
        <TextInputField onPress={() => null} containerStyle={style.search} placeholder={'Search'} />
      </View>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={style.heading}>{title}</Text>
        )}
      />
    </View>
  );
};


export default SearchScreen;
