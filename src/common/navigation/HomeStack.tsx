import { createStackNavigator } from "@react-navigation/stack";
import { FolderStackRoutes, HomeStackRoutes } from "./routes";
import HomeScreen from "../../content/home/home";
import { noHeader } from "../../content/options";
import SearchScreen from "../../content/searchScreen";
import MediaScreen from "../../content/camera/mediaScreen";
import FolderItems from "../../content/folders/folderItems/folderItems";

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
      <Home_Stack.Screen
        name={HomeStackRoutes.MediaScreen}
        component={MediaScreen}
        options={noHeader}
      />
      <Home_Stack.Screen
        name={FolderStackRoutes.FolderItems}
        component={FolderItems}
        options={noHeader}
      />
    </Home_Stack.Navigator>
  );
};

export default HomeStack;
