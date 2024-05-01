import React from "react";
import {Stack} from 'expo-router'
import {Provider} from 'react-redux'
import { store } from "../common/store";
import { noHeader } from "./options";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={noHeader} />
        <Stack.Screen name="login/index" options={{headerTitle: 'Login Screen'}} />
      </Stack>
    </Provider>
  )
}

export default RootLayout