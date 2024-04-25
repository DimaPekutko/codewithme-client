import * as React from "react";
import { inject, observer } from "mobx-react";
import { PlaygroundStore } from "stores";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Link,
  Spinner,
  Stack,
  StackDivider,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import TagsMenu from "components/TagsMenu/TagsMenu";
import Code from "components/Code/Code";
import Console from "components/Console/Console";
import { FaCheck, FaTimes } from "react-icons/fa";

interface Props {
  playgroundStore?: PlaygroundStore;
  gameId?: number;
  userId?: number;
  lproblemId: number;
  viewOnly?: boolean;
  onCodeProcessed?: (runtimeId: number) => void;
}

const ProblemPlayground = ({ playgroundStore, gameId, userId, lproblemId, viewOnly, onCodeProcessed }: Props) => {
  const [code, setCode] = React.useState("");

  const lproblem = React.useMemo(() => playgroundStore?.lproblem, [playgroundStore?.lproblem]);

  React.useEffect(() => {
    // @ts-ignore
    playgroundStore?.setup(lproblemId, gameId, userId);
    return () => {
      playgroundStore?.clear();
    };
  }, [userId]);

  React.useEffect(() => {
    const runtime = playgroundStore?.activeRuntime;
    // @ts-ignore:
    if (runtime) setCode(runtime.code);
  }, [playgroundStore?.activeRuntime]);

  React.useEffect(() => setCode(lproblem?.initial_code ?? ""), [lproblem]);

  const onSubmit = () => {
    playgroundStore?.submitCode(lproblem?.id, code, async (runtimeId: number) => {
      if (onCodeProcessed) await onCodeProcessed(runtimeId);
    });
  };

  const onChangeActiveRuntime = async (runtimeId) => await playgroundStore?.setActiveRuntime(runtimeId);

  const getRuntimeColor = (status: string) => {
    if (status === "processing") return "yellow.400";
    if (status === "completed") return "text.dark";
    return "red.400";
  };

  const getRuntimeIcon = (status: string) => {
    if (status === "processing") return <Spinner size={"xs"} />;
    if (status === "completed") return <FaCheck />;
    return <FaTimes />;
  };

  if (!lproblem) {
    return <></>;
  }

  return (
    <Flex maxW={"100%"} flexDir={"column"} gap={5}>
      <Flex maxW={"100%"} h={"90vh"} mt={5} gap={5}>
        <Flex flex={2} gap={5} flexDir={"column"} height={"100%"}>
          <Card>
            <CardHeader p={2} display={"flex"} alignItems={"center"} gap={5}>
              <Text as={"i"}>
                <Link href={`/problem/${lproblem.id}`} target={"_blank"}>
                  {lproblem?.problem.title}
                </Link>
              </Text>
              <TagsMenu
                items={[]}
                checked={lproblem?.problem.categories.map((category) => category.name)}
                onChange={() => {}}
                disabled
              />
            </CardHeader>
            <CardBody>
              <Stack gap={5}>
                <Box>
                  <Heading size={"sm"} color={"text.dark"} pb={2}>
                    Description:
                  </Heading>
                  <Text fontSize="sm">{lproblem?.problem.desc}</Text>
                </Box>
                <Box>
                  <Heading size={"sm"} color={"text.dark"} pb={2}>
                    Code context:
                  </Heading>
                  <Code code={lproblem.code_context} onBlur={() => {}} lang={lproblem.language} width="100%" disabled />
                </Box>
              </Stack>
            </CardBody>
          </Card>
          <Card overflowY={"scroll"}>
            <CardHeader p={2} display={"flex"} alignItems={"center"} color={"text.dark"} gap={5}>
              <Text>Runtimes:</Text>
            </CardHeader>
            <CardBody>
              <Stack>
                <TableContainer>
                  <Table size={"sm"} variant="simple">
                    <Thead>
                      <Tr>
                        <Th>#</Th>
                        <Th>Passed | Failed | Total</Th>
                        <Th>Status</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {playgroundStore?.runtimes.map((runtime, i) => {
                        const color = getRuntimeColor(runtime.status);
                        const isActive =
                          playgroundStore.activeRuntime && runtime.id === playgroundStore.activeRuntime.id;
                        return (
                          <Tr
                            // bgGradient={`linear(to-l, ${color}, background.dark, background.dark)`}
                            bgColor={"background.dark"}
                            borderLeft={isActive ? "2px solid white" : ""}
                            _hover={{ background: "gray.800", cursor: "pointer" }}
                            onClick={() => onChangeActiveRuntime(runtime.id)}
                          >
                            <Td>
                              <Tag size={"sm"} color={color}>
                                {playgroundStore.runtimes.length - i}
                              </Tag>
                            </Td>
                            <Td>
                              <Flex gap={5}>
                                <Text>{runtime.tests_passed ?? "?"} P</Text>
                                <Text>{runtime.tests_failed ?? "?"} F</Text>
                                <Text>{runtime.tests_passed + runtime.tests_failed || "?"} T</Text>
                              </Flex>
                            </Td>
                            <Td color={color}>{getRuntimeIcon(runtime.status)}</Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Stack>
            </CardBody>
          </Card>
        </Flex>

        <Flex flex={3} gap={5} flexDir={"column"} maxW={"50%"}>
          <Card>
            <Code
              code={code}
              onChange={(val) => setCode(val)}
              lang={lproblem.language}
              width="100%"
              disabled={viewOnly}
              styles={{
                height: "60vh",
              }}
              lineNumbers
            />
            {!viewOnly && (
              <Flex justifyContent="right">
                <ButtonGroup size={"xs"} my={2} mx={3}>
                  <Button colorScheme="primary" onClick={onSubmit} isDisabled={playgroundStore?.isProcessing}>
                    SUBMIT
                  </Button>
                </ButtonGroup>
              </Flex>
            )}
          </Card>
          <Card width={"100%"}>
            <Console width="100%" value={playgroundStore?.activeRuntime?.output ?? "..."} />
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default inject("playgroundStore")(observer(ProblemPlayground));
