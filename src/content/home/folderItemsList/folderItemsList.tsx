import { FlatList, ListRenderItem } from "react-native";
import { FolderItem } from "./type";
import { SPACINGS } from "../../../common/theme/spacing";
import { FolderListItem } from "../../../common/components/folderListItem/folderListItem";

type Props = {
  data: FolderItem[];
  onMoveToFolderPress?: VoidFunction;
};

export const FolderItemsList = ({ data, onMoveToFolderPress }: Props) => {
  const renderFolderListItem: ListRenderItem<FolderItem> = ({ item }) => (
    <FolderListItem item={item} onMoveToFolderPress={onMoveToFolderPress} />
  );

  return (
    <FlatList
      style={{ flex: 1, padding: SPACINGS.md }}
      contentContainerStyle={{ paddingBottom: 20 }}
      data={data}
      renderItem={renderFolderListItem}
      keyExtractor={(_item, index) => index.toString()}
    />
  );
};
