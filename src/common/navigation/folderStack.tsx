import { createStackNavigator } from "@react-navigation/stack";
import { FolderStackRoutes } from "./routes";
import { noHeader } from "../../content/options";
import FoldersScreen from "../../content/folders/folders";
import FolderItems from "../../content/folders/folderItems/folderItems";

const Camera_Stack = createStackNavigator();

const FolderStack = () => {
  return (
    <Camera_Stack.Navigator initialRouteName={FolderStackRoutes.Folder}>
      <Camera_Stack.Screen
        name={FolderStackRoutes.Folder}
        component={FoldersScreen}
        options={noHeader}
      />
      <Camera_Stack.Screen
        name={FolderStackRoutes.FolderItems}
        component={FolderItems}
        options={noHeader}
      />
    </Camera_Stack.Navigator>
  );
};

export default FolderStack;
