import React, { useState, useEffect, useCallback } from "react";
import { ActivityIndicator, View } from "react-native";
import Header from "../../common/header/header";
import { styles } from "../../common/theme/styles";
import { useTranslation } from "react-i18next";
import { useGetMediaListQuery } from "../../common/store/slice/api/slice";
import FolderItemsListView from "./folderItemsList/FolderItemsListView";

const HomeScreen = () => {
  const { t } = useTranslation();
  const [selectedData, setSelectedData] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const {
    data: defaultData,
    isLoading: mediaListLoading,
    isFetching,
    refetch,
  } = useGetMediaListQuery(
    { ordering: selectedData, page, limit },
    { refetchOnMountOrArgChange: true }
  );

  /*const _refetch = () => {
    console.log("refetching");
    refetch();
  };*/

  const handleSelect = useCallback(
    (selectedOption) => {
      switch (selectedOption) {
        case t("mediaList.titleA-Z"):
          setSelectedData("media_name");
          break;
        case t("mediaList.titleZ-A"):
          setSelectedData("-media_name");
          break;
        case t("mediaList.dateascending"):
          setSelectedData("created_at");
          break;
        case t("mediaList.datedescending"):
          setSelectedData("-created_at");
          break;
        default:
          break;
      }
    },
    [t]
  );

  const options = [
    { label: t("mediaList.titleA-Z"), value: t("mediaList.titleA-Z") },
    { label: t("mediaList.titleZ-A"), value: t("mediaList.titleZ-A") },
    {
      label: t("mediaList.dateascending"),
      value: t("mediaList.dateascending"),
    },
    {
      label: t("mediaList.datedescending"),
      value: t("mediaList.datedescending"),
    },
  ];

  const loadMoreData = useCallback(() => {
    if (!mediaListLoading && defaultData?.next !== null) {
      setPage((prevPage) => prevPage + 1);
    } else {
      setPage(1);
    }
  }, [mediaListLoading, defaultData]);

  const handleEndReached = useCallback(() => {
    loadMoreData();
  }, [loadMoreData]);

  useEffect(() => {
    setPage(1);
  }, [selectedData]);

  return (
    <View style={styles.flex}>
      <Header
        items={options}
        title={t("header.recent")}
        handleSelect={handleSelect}
      />
      <FolderItemsListView
        data={defaultData}
        loadings={mediaListLoading}
        onEndReached={handleEndReached}
        refetch={refetch}
        isFetching={isFetching}
      />
    </View>
  );
};

export default HomeScreen;
