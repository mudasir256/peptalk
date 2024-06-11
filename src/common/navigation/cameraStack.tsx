import { createStackNavigator } from "@react-navigation/stack";
import { CameraStackRoutes } from "./routes";
import { noHeader } from "../../content/options";
import VideoScreen from "../../content/camera/videoScreen/videoScreen";
import CameraScreen from "../../content/camera/camera";
import EditVideo from "../../content/camera/videoScreen/editVideo";

const Camera_Stack = createStackNavigator();

const CameraStack = () => {
  return (
    <Camera_Stack.Navigator initialRouteName={CameraStackRoutes.Camera}>
      <Camera_Stack.Screen
        name={CameraStackRoutes.CameraScreen}
        component={CameraScreen}
        options={noHeader}
      />
      <Camera_Stack.Screen
        name={CameraStackRoutes.VideoScreen}
        component={VideoScreen}
        options={noHeader}
      />
      <Camera_Stack.Screen
        name={CameraStackRoutes.EditVideo}
        component={EditVideo}
        options={noHeader}
      />
    </Camera_Stack.Navigator>
  );
};

export default CameraStack;
