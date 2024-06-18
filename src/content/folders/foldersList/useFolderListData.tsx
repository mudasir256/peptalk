import Toast from "react-native-toast-message";
import {
  useDeleteFolderMutation,
  useFoldersListQuery,
  useUpdateFolderMutation,
} from "../../../common/store/slice/api/slice";
import { Folder } from "./types";
import { useState } from "react";

export const useFoldersData = () => {
  const { data, isLoading } = useFoldersListQuery({});
  const { results: foldersList = [] } = data || {};
  const [folderToUpdate, setFolderToUpdate] = useState(null);
  const [deleteFolder, { isLoading: deleting, isError, isSuccess }] =
    useDeleteFolderMutation();
  const [
    updateFolder,
    { isLoading: isLoadingUpdate, isError: isUpdatingError },
  ] = useUpdateFolderMutation();

  const handleDeleteFolder = async ({ id, folder_name }: Folder) => {
    try {
      const res = await deleteFolder(id);
      if (isError) {
        Toast.show({
          type: "error",
          text1: "Failed to delete",
        });
      } else {
        Toast.show({
          type: "success",
          text1: `${folder_name} Deleted Successfully`,
          position: "bottom",
        });
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };
  const handleRenameFolder = async ({ id }: Folder, updatedName: string) => {
    console.log("foldername", updatedName);
    const data = {
      folder_name: updatedName,
    };
    try {
      const res = await updateFolder({ id: id, data }).unwrap();
      console.log(res, "console pof update");
      if (isUpdatingError) {
        Toast.show({
          type: "error",
          text1: "Error Updating Folder",
        });
      } else {
        Toast.show({
          type: "success",
          text1: `${updatedName} Updated successfully`,
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
  };
};
