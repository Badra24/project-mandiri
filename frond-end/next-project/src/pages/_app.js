import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { ColorModeScript } from "@chakra-ui/react";
import { Provider } from "react-redux";
import Authprovider from "../component/Authprovider";
import store from "../redux/reducer/store";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Authprovider>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Component {...pageProps} />
        </ChakraProvider>
      </Authprovider>
    </Provider>
  );
}

export default MyApp;
