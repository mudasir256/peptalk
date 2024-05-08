import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './src/common/store';
import { RootNavigator } from './src/common/navigation/RootNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style='light' />
      <RootNavigator />
    </Provider>
  );
}

