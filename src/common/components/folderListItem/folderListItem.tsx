import React, { useState } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { style } from './style';
import { IMAGES } from '../../../assets/images';
import IconButton from '../../../content/home/folderItemsList/iconButton';
import { FolderItem } from '../../../content/home/folderItemsList/type';

type Props = {
  item: FolderItem
  onMoveToFolderPress: VoidFunction
}

export const FolderListItem = ({ item, onMoveToFolderPress }: Props) => {

  return (
    <View style={style.container}>
      <Image source={{ uri: item.image }} style={style.image} />
      <View style={style.details}>
        <View>
          <Text style={style.title}>{item.title}</Text>
          <Text style={style.date}>Folders: {item.name}</Text>
          <Text style={style.date}>Date: {item.date}</Text>
        </View>
        <View style={style.iconContainer}>
          <IconButton icon={IMAGES.edit} />
          <IconButton icon={IMAGES.movefolder} onPress={onMoveToFolderPress} />
          <IconButton icon={IMAGES.trash} />
        </View>
      </View>
    </View>
  );
};
