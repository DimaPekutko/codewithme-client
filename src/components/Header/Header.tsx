import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  HStack,
  Heading,
  Link,
  Progress,
  Spacer,
  Text,
  useStyleConfig,
} from "@chakra-ui/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaArrowCircleRight, FaLongArrowAltRight } from "react-icons/fa";
import { inject, observer } from "mobx-react";
import { formatLocation } from "./helpers";
import { AuthStore } from "stores";

interface Props {
  authStore?: AuthStore;
}

function Header({ authStore }: Props) {
  const styles: any = useStyleConfig("Header");
  const location: any = useLocation();
  const loc = useMemo(() => formatLocation(location), [location]);
  const navigate = useNavigate();

  const [progress, setProgress] = useState(false);

  useEffect(() => {
    authStore?.autoLogin();
  }, []);

  useEffect(() => {
    setProgress(true);
    setTimeout(() => setProgress(false), 1000);
  }, [location]);

  const onAvatarClick = () => {
    // authStore?.logout();
    if (authStore?.user) navigate(`profile/${authStore?.user.id}`);
  };

  return (
    <>
      <Progress w="100%" h={0.5} background={"primary"} colorScheme={"primary"} isIndeterminate={progress} />
      <Flex style={styles} p={2}>
        <Breadcrumb separator={<FaLongArrowAltRight />} fontStyle={""}>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Text fontWeight={"bold"} color={"primary.200"}>
                <NavLink to={"/"}>
                  <Text>C O D E W I T H M E</Text>
                </NavLink>
              </Text>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {loc && (
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Text decoration={"Highlight"}>{loc}</Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </Breadcrumb>

        <HStack flex={1} justifyContent={"flex-end"} gap={10}>
          {authStore?.loggedIn && (
            <>
              <Text>
                <NavLink to={"/top"}>Top Players</NavLink>
              </Text>
              <Text>
                <NavLink to={"/management"}>Admin Panel</NavLink>
              </Text>
            </>
          )}
          {authStore?.loggedIn ? (
            <Avatar
              size={"sm"}
              name={authStore.user?.full_name}
              src={authStore.user?.picture}
              loading="lazy"
              borderRadius={5}
              cursor="pointer"
              onClick={onAvatarClick}
            />
          ) : (
            <NavLink to="/auth/signin">
              <Button colorScheme="green" size={"xs"}>
                SIGN IN
              </Button>
            </NavLink>
          )}
        </HStack>
      </Flex>
    </>
  );
}

export default inject("authStore")(observer(Header));
