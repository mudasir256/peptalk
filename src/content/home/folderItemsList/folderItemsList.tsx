import {
  FlatList,
  ListRenderItem,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { FolderItem } from "./type";
import { SPACINGS } from "../../../common/theme/spacing";
import { FolderListItem } from "../../../common/components/folderListItem/folderListItem";
import { styles } from "../../../common/theme/styles";
import { useTranslation } from "react-i18next";

type Props = {
  data: FolderItem[];
  loading: boolean;
  onMoveToFolderPress: (id: string) => void;
};

export const FolderItemsList = ({
  data,
  onMoveToFolderPress,
  loading,
}: Props) => {
  const { t } = useTranslation();
  const renderFolderListItem: ListRenderItem<FolderItem> = ({ item }) => {
    return (
      <FolderListItem item={item} onMoveToFolderPress={onMoveToFolderPress} />
    );
  };
  return (
    <>
      {loading ? (
        <ActivityIndicator size={"large"} style={styles.flex} />
      ) : (
        <FlatList
          style={{ flex: 1, padding: SPACINGS.md }}
          contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
          data={data}
          renderItem={renderFolderListItem}
          keyExtractor={(_item, index) => index.toString()}
          ListEmptyComponent={() => {
            return (
              <View style={[styles.center, styles.flex]}>
                <Text>{t("common.nodata")}</Text>
              </View>
            );
          }}
        />
      )}
    </>
  );
};
