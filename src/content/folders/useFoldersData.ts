import Toast from "react-native-toast-message";
import { useAddFolderMutationMutation } from "../../common/store/slice/api/slice"
import { useTranslation } from "react-i18next";

export const useFoldersData = () => {
  const [addFolder, {isLoading: addingFolder, data, error: addFolderError}] = useAddFolderMutationMutation({})
  const { t } = useTranslation();

  const handleAddFolder = async (folderName: string) => {
    if (folderName.trim() !== "") {
      const data = {
        folder_name: folderName,
      };
      try {
        await addFolder(data).unwrap();
        Toast.show({
          type: t("mediaList.success"),
          text1: `${folderName} ${t("mediaList.addedsuccessfully")}`
        });
      } catch(err) {
        Toast.show({
          type: t("mediaList.error"),
          text1: t("mediaList.addingerror"),
        });
      }
    }
  };

  return {
    addingFolder,
    handleAddFolder,
    data,
  }
}