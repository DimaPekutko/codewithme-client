import React from "react";
import ReactDOM from "react-dom/client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "mobx-react";
import { theme } from "./styles/theme";
import resources from "./lang/resources";
import App from "./components/App/App";
import { stores } from "stores";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
});

root.render(
  // <React.StrictMode>
  <ChakraProvider theme={theme}>
    <GoogleOAuthProvider clientId="476216906456-colgf0i2gff7kokk61g7eh137neo928b.apps.googleusercontent.com">
      <Provider {...stores}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </ChakraProvider>,
  // </React.StrictMode>,
);
