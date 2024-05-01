import { NavigationContainer } from "@react-navigation/native";
import LoginStack from "./LoginStack";
import HomeStack from "./HomeStack";
import { useAppSelector } from "../store";
import { selectAuthState, selectAuthenticationState } from "../store/selectors";
import { AuthState } from "../store/slice/authentication/types";

export const RootNavigator = () => {
  const authStatus = useAppSelector(selectAuthState)
  return (
    <NavigationContainer>
      {authStatus === AuthState.Authenticated ? <HomeStack /> : <LoginStack />}
    </NavigationContainer>
  );
};
