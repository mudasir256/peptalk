import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ReverseCam } from "../../assets/svgs/svgIcons";
import { style } from "./style";

const CameraControls = ({
  isRecording,
  onStartRecording,
  onStopRecording,
  onCameraSwitch,
}) => {
  return (
    <>
      <TouchableOpacity style={style.reverseCam} onPress={onCameraSwitch}>
        <ReverseCam />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          style.button,
          {
            backgroundColor: isRecording
              ? "#FF3B30"
              : style.button.backgroundColor,
            opacity: isRecording ? 0.5 : 1,
          },
        ]}
        onPress={isRecording ? onStopRecording : onStartRecording}
      >
        <View style={style.buttonText}></View>
      </TouchableOpacity>
    </>
  );
};

export default CameraControls;
