import { Alert } from "react-native";
import {
  useDeleteMediaMutation,
  useUpdateMediaMutation,
} from "../../store/slice/api/slice";
import Toast from "react-native-toast-message";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useMediaList = ({ refetch }: { refetch: () => void }) => {
  const [deleteMedia] = useDeleteMediaMutation({});
  const [updateMedia, { isLoading: loading }] = useUpdateMediaMutation();
  const [mediaId, setMediaId] = useState();
  const { t } = useTranslation();

  const handleDeletemedia = async ({ id, media_name }) => {
    setMediaId(id);

    try {
      await deleteMedia(id).unwrap();
      refetch();
      Toast.show({
        type: t("mediaList.success"),
        text1: `${media_name} ${t("mediaList.itemdeleted")}`,
        position: "bottom",
      });
    } catch (error) {
      Toast.show({
        type: t("mediaList.error"),
        text1: t("mediaList.failedtodeleteitem"),
      });
    }

    /*Alert.alert(
      t("mediaList.deleteitem"),
      t("mediaList.delete", { media_name: media_name }),
      [
        {
          text: t("mediaList.cancel"),
          style: "cancel",
        },
        {
          text: t("modal.ok"),
          onPress: async () => {
            try {
              await deleteMedia(id).unwrap();
              Toast.show({
                type: t("mediaList.success"),
                text1: `${media_name} ${t("mediaList.itemdeleted")}`,
                position: "bottom",
              });
            } catch (error) {
              Toast.show({
                type: t("mediaList.error"),
                text1: t("mediaList.failedtodeleteitem"),
              });
            }
          },
        },
      ],
      { cancelable: false }
    );
    */
  };
  const handleRenameMedia = async ({
    id,
    newName,
  }: {
    id: any;
    newName: string;
  }) => {
    /*let _newName = await new Promise((resolve) => {
      //Alert.prompt(
        t("mediaList.renamemedia"),
        t("mediaList.enternewmedianame"),
        (inputValue) => {
          resolve(inputValue);
        }
      );
    });*/

    if (newName !== null) {
      const datatoSubmit = {
        media_name: newName,
      };
      try {
        const res = await updateMedia({
          id: id,
          data: datatoSubmit,
        }).unwrap();
        refetch();
        Toast.show({
          type: t("mediaList.success"),
          text1: `${newName} ${t("mediaList.itemrenamedsuccessfully")}`,
        });
      } catch (error) {
        Toast.show({
          type: t("mediaList.error"),
          text1: t("mediaList.failedtorenameitem"),
        });
      }
    }
  };
  return {
    handleRenameMedia,
    loading,
    handleDeletemedia,
  };
};
