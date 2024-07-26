import Toast from "react-native-toast-message";
import {
  useAddFolderMutationMutation,
  useDeleteFolderMutation,
  useFoldersListQuery,
  useFoldersListQuery_data,
  useUpdateFolderMutation,
} from "../../../common/store/slice/api/slice";
import { Folder } from "./types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useFoldersData = (queryParams?: useFoldersListQuery_data) => {
  const { data, isLoading, isFetching, refetch } = useFoldersListQuery(
    queryParams ?? {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { t } = useTranslation();
  const [
    addFolder,
    { isLoading: addingFolder, data: addingFolderData, error: addFolderError },
  ] = useAddFolderMutationMutation({});
  const { results: foldersList = [] } = data || {};
  const [folderToUpdate, setFolderToUpdate] = useState(null);
  const [deleteFolder, { isLoading: deleting, isError, isSuccess }] =
    useDeleteFolderMutation();
  const [
    updateFolder,
    { isLoading: isLoadingUpdate, isError: isUpdatingError },
  ] = useUpdateFolderMutation();

  const handleAddFolder = async (folderName: string) => {
    if (folderName.trim() !== "") {
      const data = {
        folder_name: folderName,
      };
      try {
        const folderInfo = (await addFolder(data).unwrap()) as FolderType;
        Toast.show({
          type: t("mediaList.success"),
          text1: `${folderName} ${t("mediaList.folderaddedsuccessfully")}`,
        });
        return folderInfo;
      } catch (err) {
        Toast.show({
          type: t("mediaList.error"),
          text1: t("mediaList.erroraddingfolder"),
        });
      }
    }
  };

  const handleDeleteFolder = async ({ id, folder_name }: Folder) => {
    try {
      const res = await deleteFolder(id);
      if (isError) {
        Toast.show({
          type: t("toast.error"),
          text1: t("mediaList.errordeletingfolder"),
        });
      } else {
        Toast.show({
          type: t("toast.success"),
          text1: `${folder_name} ${t("mediaList.folderdeletedsuccessfully")}`,
          position: "bottom",
        });
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };
  const handleRenameFolder = async ({ id }: Folder, updatedName: string) => {
    const data = {
      folder_name: updatedName,
    };
    try {
      const res = await updateFolder({ id: id, data }).unwrap();
      if (isUpdatingError) {
        Toast.show({
          type: t("toast.error"),
          text1: t("toast.errorupdating"),
        });
      } else {
        Toast.show({
          type: t("toast.success"),
          text1: `${updatedName} ${t("toast.updatedsuccessfully")}`,
        });
      }
    } catch (error) {
      console.error("Error updating folder:", error);
    }
    setFolderToUpdate(null);
  };
  return {
    handleRenameFolder,
    deleting,
    isLoading,
    foldersList,
    handleDeleteFolder,
    isLoadingUpdate,
    data,
    addingFolder,
    handleAddFolder,
    addingFolderData,
    isFetching,
    refetch,
  };
};

type FolderType = {
  created_at: string;
  folder_name: string;
  id: string;
  media: any[];
  parent: any;
  sub_folder: any[];
  updated_at: string;
};
