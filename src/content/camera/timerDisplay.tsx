import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { style } from "./style";

const TimerDisplay = ({ isRecording }) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    let timer;
    if (isRecording) {
      setSecondsElapsed(0);
      timer = setInterval(() => {
        setSecondsElapsed((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const formattedTime = `${Math.floor(secondsElapsed / 60)}:${(
    "0" +
    (secondsElapsed % 60)
  ).slice(-2)}`;

  return isRecording ? (
    <View style={style.recording}>
      <Text style={style.txt}>{formattedTime}</Text>
    </View>
  ) : null;
};

export default TimerDisplay;
