import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackRoutes } from "./routes";
import SearchScreen from "../../content/searchScreen";
import HomeScreen from "../../content/home/home";
import { noHeader } from "../../content/options";

const Home_Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Home_Stack.Navigator initialRouteName={HomeStackRoutes.Home}>
      <Home_Stack.Screen
        name={HomeStackRoutes.Home}
        component={HomeScreen}
        options={noHeader}
      />
      <Home_Stack.Screen
        name={HomeStackRoutes.Search}
        component={SearchScreen}
        options={noHeader}
      />
    </Home_Stack.Navigator>
  );
};

export default HomeStack;
