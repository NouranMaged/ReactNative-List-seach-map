import { Provider } from "react-redux";
import store from "./src/store/store";
import Routes from "./src/navigation/routes";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Routes />
      </Provider>
    </SafeAreaProvider>
  );
}
