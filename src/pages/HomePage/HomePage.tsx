import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Stack,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import TagsMenu from "components/TagsMenu/TagsMenu";
import { LANGUAGES } from "consts";
import PageLayout from "layouts/PageLayout/PageLayout";
import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeStore } from "stores";

interface Props {
  homeStore?: HomeStore;
}

const HomePage = ({ homeStore }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    homeStore?.setup();
  }, []);

  const onGameFound = (data) =>
    homeStore?.searchPayload.game_type === "online"
      ? navigate(`/game/${data.game_id}`)
      : navigate(`/problem/${data.lproblem_id}`);

  const onSubmit = () => {
    setShowModal(true);
    homeStore?.startProblemSearch(onGameFound);
  };

  const onAbortSearch = () => {
    setShowModal(false);
    homeStore?.abortProblemSearch();
  };

  return (
    <PageLayout size="middle">
      <Modal size={"xs"} motionPreset="slideInTop" isCentered isOpen={showModal} onClose={onAbortSearch}>
        <ModalOverlay />
        <ModalContent mt={"30vh"} background={"background.dark"}>
          <ModalHeader>Searching for a problem...</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} justifyContent={"center"}>
            <Spinner color="text.dark" size={"xl"} my={5} speed="0.65s" thickness={"8px"} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Flex width={"100%"} justifyContent={"center"} mt={"3vh"}>
        <Card backgroundColor={"gray.800"} width={"60%"}>
          <CardHeader>
            <Heading size="md">Find a Problem</Heading>
          </CardHeader>

          <CardBody>
            <Tabs
              variant={"enclosed"}
              isFitted
              onChange={(idx) => homeStore?.assignToPayload({ game_type: idx === 0 ? "offline" : "online" })}
            >
              <TabList mb="1em" display={"flex"} justifyContent={"space-around"}>
                <Tab>
                  <Badge colorScheme={"yellow"}>o f f l i n e</Badge>
                </Tab>
                <Tab>
                  <Badge colorScheme={"green"}>o n l i n e</Badge>
                </Tab>
              </TabList>
            </Tabs>
            <Flex flexDir="column" px={5}>
              <Flex alignItems={"center"} gap={5}>
                <Text>Complexity: </Text>
                <Flex my={5} width={"100%"} gap={5}>
                  <Slider
                    min={1}
                    max={10}
                    defaultValue={homeStore?.searchPayload.complexity_level}
                    colorScheme="primary"
                    onChange={(val) => homeStore?.assignToPayload({ complexity_level: val })}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Flex>
              </Flex>
              <Flex alignItems={"center"} gap={5} mb={5}>
                <Text>Categories: </Text>
                <TagsMenu
                  items={homeStore?.categories.map((c) => c.name) ?? []}
                  checked={homeStore?.searchPayload.categories ?? []}
                  onChange={(val) => homeStore?.assignToPayload({ categories: val })}
                />
              </Flex>
              <Flex alignItems={"center"} gap={5}>
                <Text>Languages: </Text>
                <TagsMenu
                  items={LANGUAGES}
                  checked={homeStore?.searchPayload.languages ?? []}
                  onChange={(val) => homeStore?.assignToPayload({ languages: val })}
                />
              </Flex>
              <Flex justifyContent={"right"}>
                <Button colorScheme="primary" mt={5} size={"xs"} onClick={onSubmit}>
                  Find A Problem
                </Button>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    </PageLayout>
  );
};

export default inject("homeStore")(observer(HomePage));
