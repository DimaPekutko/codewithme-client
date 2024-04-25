import React from "react";
import {
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  PinInputField,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useStyleConfig,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";

import Header from "components/Header/Header";
import { AuthPage, GamePage, HomePage, ManagementPage, ProblemPage, UserProfilePage } from "pages";

function App() {
  const styles: any = useStyleConfig("MainWrap");
  return (
    <Container {...styles}>
      <Router>
        <Header />
        <Flex px={2}>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/auth" element={<AuthPage />}>
              <Route path="signin" element={<div>login</div>}></Route>
              <Route path="signup" element={<div>registration</div>}></Route>
            </Route>
            <Route path="/management" element={<ManagementPage />}></Route>
            <Route path="/profile/:userId" element={<UserProfilePage />}></Route>
            <Route path="/problem/:id" element={<ProblemPage />}></Route>
            <Route path="/game/:id" element={<GamePage />}></Route>
          </Routes>
        </Flex>
      </Router>
    </Container>
  );
}

export default App;
