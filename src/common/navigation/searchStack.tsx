import { createStackNavigator } from "@react-navigation/stack";
import { SearchStackRoutes } from "./routes";
import SearchScreen from "../../content/searchScreen";
import HomeScreen from "../../content/home/home";
import { noHeader } from "../../content/options";


const Search_Stack = createStackNavigator();


const SearchStack = () => {
  return (
    <Search_Stack.Navigator initialRouteName={SearchStackRoutes.HomeX}>
      <Search_Stack.Screen
        name={SearchStackRoutes.HomeX}
        component={HomeScreen}
        options={noHeader}
      />
      <Search_Stack.Screen
        name={SearchStackRoutes.SearchX}
        component={SearchScreen}
        options={noHeader}
      />

    </Search_Stack.Navigator>
  )
}

export default SearchStack;
