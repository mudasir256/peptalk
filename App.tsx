import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './src/common/navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './src/common/store';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style='light' />
      <RootNavigator />
    </Provider>
  );
}

