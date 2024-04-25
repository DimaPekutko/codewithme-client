import * as React from "react";
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Badge,
  Button,
  ButtonGroup,
  Code,
  Divider,
  Flex,
  HStack,
  Heading,
  Spacer,
  Tag,
  Text,
  Tooltip,
  useStyleConfig,
} from "@chakra-ui/react";
import Languages from "components/Language/Languages";
import ProblemForm from "../ProblemForm/ProblemForm";
import { FaTrash } from "react-icons/fa";
import { ManagementStore } from "stores";
import { inject, observer } from "mobx-react";
import { useNotify } from "hooks";

interface Props {
  problem: ProblemFull;
  index: number;
  managementStore?: ManagementStore;
}

const ProblemItem = ({ problem, index, managementStore }: Props) => {
  const [toggleError, setToggleError] = React.useState("");
  const notify = useNotify();

  const deleteProblem = () => managementStore?.deleteProblem(problem.id);

  const isActive = React.useMemo(() => problem.status === "active", [problem]);

  const toggleProblem = async () => {
    setToggleError("");
    const error = await managementStore?.toggleProblem(problem.id);

    if (isActive) {
      return;
    }

    if (error) {
      // @ts-ignore:
      setToggleError(error);
      notify(`Error: ${error}`, "error");
    } else {
      notify(`Problem '${problem.title}' has been activated`, "success");
    }
  };

  const getBorderColor = () => {
    if (toggleError) return "pink";
    if (isActive) return "green";
    return "outline";
  };

  return (
    <AccordionItem borderLeftWidth={3} borderLeftColor={getBorderColor()}>
      <Flex flexDirection="column">
        <AccordionButton gap={5}>
          <HStack width={"100%"}>
            <Flex alignItems={"center"} gap={5} color={"labelText"} width={"100%"}>
              <Text size="sm">
                {problem.title}
              </Text>
              <Languages langs={problem.langs} />
              <Spacer />
              {toggleError && (
                <Tooltip hasArrow placement="bottom" label={`Error: ${toggleError}`}>
                  <Tag colorScheme="red">e r r o r</Tag>
                </Tooltip>
              )}
              <ButtonGroup size={"xs"} onClick={(e) => e.preventDefault()}>
                <Button
                  colorScheme={isActive ? "yellow" : "green"}
                  onClick={toggleProblem}
                  isLoading={managementStore?.problemsLoaders[problem.id]}
                >
                  {isActive ? "Stop" : "Activate"}
                </Button>
                <Button colorScheme="red" onClick={deleteProblem}>
                  <FaTrash />
                </Button>
              </ButtonGroup>
            </Flex>
          </HStack>
        </AccordionButton>
        <AccordionPanel>
          {!isActive ? <ProblemForm problem={problem} /> : <Text>Deactivate for editing</Text>}
        </AccordionPanel>
      </Flex>
    </AccordionItem>
  );
};

export default inject("managementStore")(observer(ProblemItem));
