import * as React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  Center,
  Circle,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import ProblemItem from "./ProblemItem/ProblemItem";
import { inject, observer } from "mobx-react";
import { AuthStore, ManagementStore } from "stores";
import { FaPlusCircle } from "react-icons/fa";

interface Props {
  managementStore?: ManagementStore;
}

const Problems = ({ managementStore }: Props) => {
  const newProblem = () => managementStore?.newTemplate();

  React.useEffect(() => {
    managementStore?.setup();
  }, []);

  return (
    <Flex flexDir="column">
      <Button colorScheme="primary" variant="outline" size={"sm"} onClick={newProblem}>
        Create Problem
      </Button>
      <Accordion display="flex" flexDirection="column" w="100%" mt={10} allowToggle>
        {managementStore?.problemsLoaded ? (
          managementStore.problems.length ? (
            managementStore?.problems.map((problem, i) => <ProblemItem problem={problem} index={i} key={i} />)
          ) : (
            <Center>
              <Text>No problems yet</Text>
            </Center>
          )
        ) : (
          <Center>
            <Spinner size={"xl"} marginTop={"180px"} thickness={"5px"} />
          </Center>
        )}
      </Accordion>
    </Flex>
  );
};

export default inject("managementStore")(observer(Problems));
