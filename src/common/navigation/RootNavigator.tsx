import { NavigationContainer } from "@react-navigation/native";
import { useAppSelector } from "../store";
import { selectAuthState } from "../store/selectors";
import { AuthState } from "../store/slice/authentication/types";
import HomeStack from "./bottomTabsStack";
import LoginStack from "./LoginStack";

export const RootNavigator = () => {
  const authStatus = useAppSelector(selectAuthState);
  return (
    <NavigationContainer>
      {authStatus === AuthState.Authenticated ? <HomeStack /> : <HomeStack />}
    </NavigationContainer>
  );
};
