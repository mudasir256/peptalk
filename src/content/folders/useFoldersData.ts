import Toast from "react-native-toast-message";
import { useAddFolderMutationMutation } from "../../common/store/slice/api/slice"

export const useFoldersData = () => {
  const [addFolder, {isLoading: addingFolder, data, error: addFolderError}] = useAddFolderMutationMutation({})

  const handleAddFolder = async (folderName: string) => {
    if (folderName.trim() !== "") {
      const data = {
        folder_name: folderName,
      };
      try {
        await addFolder(data).unwrap();
        Toast.show({
          type: "success",
          text1: `${folderName} added successfully`,
        });
      } catch(err) {
        Toast.show({
          type: "error",
          text1: "Error Adding Folder",
        });
      }
    }
  };

  return {
    addingFolder,
    handleAddFolder
  }
}