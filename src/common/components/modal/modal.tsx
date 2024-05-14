import React, { useState } from "react";
import { Modal, View, StyleSheet, Text } from "react-native";
import { TextInputField } from "../input/input";
import { COLORS } from "../../theme/colors";
import { styles } from "../../theme/styles";
import PrimaryButton from "../primaryButton";
import { SPACINGS } from "../../theme/spacing";

const AddFolderModal = ({ visible, onClose, onAdd }) => {
  const [folderName, setFolderName] = useState("");

  const handleCancel = () => {
    setFolderName("");
    onClose();
  };

  const handleAdd = () => {
    if (folderName.trim() !== "") {
      onAdd(folderName);
      setFolderName("");
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleCancel}
    >
      <View style={style.centeredView}>
        <View style={style.modalView}>
          <Text style={style.addNew}>Add New Folder</Text>
          <Text style={style.modalTitle}>Folder Name</Text>
          <TextInputField
            placeholder={"Add Folder"}
            containerStyle={{ backgroundColor: COLORS.inputbg }}
            value={folderName}
            onChangeText={setFolderName}
          />
          <View style={style.buttonContainer}>
            <PrimaryButton
              title="cancel"
              containerStyle={style.cancel}
              onPress={handleCancel}
            />
            <PrimaryButton
              title="OK"
              containerStyle={style.ok}
              onPress={handleAdd}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  centeredView: {
    padding: SPACINGS.md,
    ...styles.flex,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: 80,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  addNew: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 33,
    color: COLORS.text,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.text,
  },
  cancel: {
    width: 100,
    borderColor: COLORS.secondary,
  },
  ok: {
    width: 75,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
});

export default AddFolderModal;
