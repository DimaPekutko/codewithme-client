import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useGoogleLogin } from "@react-oauth/google";

import PageLayout from "layouts/PageLayout/PageLayout";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { AuthStore } from "stores";
import { useNotify } from "hooks";
import { FaGoogle, FaUser } from "react-icons/fa";

interface Props {
  authStore?: AuthStore;
}

const AuthPage = ({ authStore }: Props) => {
  const navigate = useNavigate();
  const notify = useNotify();

  const googleLoginSuccess = async (tokenResponse) => {
    if (await authStore?.googleAuth(tokenResponse)) {
      notify(`Auth Succeeded!`, "success");
      navigate("/");
    }
  };

  const login = useGoogleLogin({
    onError: () => {},
    onSuccess: async (creds) => await googleLoginSuccess(creds),
  });

  return (
    <PageLayout size="middle">
      <Center mt={"20vh"}>
        <Card width={"40%"}>
          <CardHeader textAlign={"center"}>
            <Heading size={"md"}>Sign In</Heading>
          </CardHeader>
          <CardBody>
            <Flex flexDir={"column"} gap={10}>
              <Flex justifyContent={"center"}>
                <FaUser size={"50px"} />
              </Flex>
              <Button w={"full"} colorScheme={"primary"} leftIcon={<FaGoogle />} onClick={() => login()}>
                <Center>
                  <Text>Google Sign In</Text>
                </Center>
              </Button>
            </Flex>
          </CardBody>
        </Card>
      </Center>
    </PageLayout>
  );
};

export default inject("authStore")(observer(AuthPage));
