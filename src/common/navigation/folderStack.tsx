import { createStackNavigator } from "@react-navigation/stack";
import { FolderStackRoutes } from "./routes";
import { noHeader } from "../../content/options";
import FoldersScreen from "../../content/folders/folders";
import FolderItems from "../../content/folders/folderItems/folderItems";

const Folder_Stack = createStackNavigator();

const FolderStack = () => {
  return (
    <Folder_Stack.Navigator initialRouteName={FolderStackRoutes.Folder}>
      <Folder_Stack.Screen
        name={FolderStackRoutes.Folder}
        component={FoldersScreen}
        options={noHeader}
      />
      <Folder_Stack.Screen
        name={FolderStackRoutes.FolderItems}
        component={FolderItems}
        options={noHeader}
      />
    </Folder_Stack.Navigator>
  );
};

export default FolderStack;
