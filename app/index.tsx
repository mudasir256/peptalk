import React, { useEffect } from "react";
import {View, ActivityIndicator} from "react-native"
import { router } from 'expo-router';
import { useFetchTodosQuery } from "../common/store/slice/api";
import { styles } from "../common/styles";

const SplashScreen = () => {
  const {data} = useFetchTodosQuery(1)
  
  useEffect(() => {
    if (data) router.replace('/login')
  }, [data])

  return (
      <View style={styles.absoluteCenter}>
          <ActivityIndicator />
      </View>
  )
}

export default SplashScreen