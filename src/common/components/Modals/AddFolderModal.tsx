import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import CustomModal from "../modal/modal";

const AddFolderModal = memo(
  ({
    isVisible,
    onClose,
    onSave,
    isLoading,
  }: {
    isVisible: boolean;
    onClose: () => void;
    onSave: (folder: string) => Promise<void>;
    isLoading: boolean;
  }) => {
    const { t } = useTranslation();

    return (
      <CustomModal
        visible={isVisible}
        onClose={onClose}
        title={t("modal.titleModal")}
        showInput
        onPressOk={onSave}
        loading={isLoading}
        showCancel={true}
      />
    );
  }
);

export default AddFolderModal;
