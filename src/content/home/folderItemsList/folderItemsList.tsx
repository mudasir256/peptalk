import {
  FlatList,
  ListRenderItem,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { FolderItem } from "./type";
import { SPACINGS } from "../../../common/theme/spacing";
import { FolderListItem } from "../../../common/components/folderListItem/folderListItem";
import { styles } from "../../../common/theme/styles";
import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";
import { COLORS } from "../../../common/theme/colors";

type Props = {
  data: FolderItem[];
  loading: boolean;
  isFetching: boolean;
  onMoveToFolderPress: (id: string) => void;
  handleEndReached?: () => void;
  refetch: () => void;
};

export const FolderItemsList = ({
  data,
  onMoveToFolderPress,
  loading,
  isFetching,
  handleEndReached,
  refetch,
}: Props) => {
  const { t } = useTranslation();

  const renderFolderListItem: ListRenderItem<FolderItem> = ({ item }) => {
    return (
      <FolderListItem
        item={item}
        onMoveToFolderPress={onMoveToFolderPress}
        refetch={refetch}
      />
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
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={refetch}
              colors={[COLORS.shadow, COLORS.shadow]}
              tintColor={COLORS.shadow}
              titleColor={COLORS.shadow}
            />
          }
          onEndReachedThreshold={0.5}
          onEndReached={handleEndReached}
        />
      )}
    </>
  );
};
