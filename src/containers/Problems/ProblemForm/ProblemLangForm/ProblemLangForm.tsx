import { Box, Button, ButtonGroup, Container, Divider, Flex, Text } from "@chakra-ui/react";
import Code from "components/Code/Code";
import * as React from "react";
import { getLangAssertTemplate, getLangContextTemplate, getLangProblemTemplate } from "./helpers";
import Console from "components/Console/Console";
import { ManagementStore } from "stores";
import { inject, observer } from "mobx-react";

interface Props {
  langProblem: LangProblem;
  problemId: number;
  managementStore?: ManagementStore;
}

const ProblemLangForm = ({ problemId, langProblem, managementStore }: Props) => {
  const lang = langProblem.language;

  const onAssertionChange = (testId, code) => {
    managementStore?.updateCodeAssertion(problemId, langProblem.id, testId, { code });
  };

  const addAssertion = () => managementStore?.addCodeAssertion(problemId, langProblem.id);
  const deleteAssertion = (testId) => managementStore?.deleteCodeAssertion(problemId, langProblem.id, testId);

  const onCtxChange = (val) => managementStore?.updateLangProblem(problemId, langProblem.id, { code_context: val });
  const onProblemDeclChange = (val) =>
    managementStore?.updateLangProblem(problemId, langProblem.id, { initial_code: val });

  return (
    <Container maxW={"8xl"}>
      <Box py={3}>
        <Text color={"gray.400"}>Define context for problem</Text>
        <Divider />
      </Box>
      <Code
        code={langProblem.code_context || getLangContextTemplate(lang)}
        onBlur={onCtxChange}
        lang={lang}
        width="100%"
      />
      <Box py={3}>
        <Text color={"gray.400"}>Define initial function</Text>
        <Divider />
      </Box>
      <Code
        code={langProblem.initial_code || getLangProblemTemplate(lang)}
        onBlur={onProblemDeclChange}
        lang={lang}
        width="100%"
      />
      <Container maxW={"3xl"}>
        <Box py={3}>
          <Text color={"gray.400"}>Add at least 1 test</Text>
          <Divider />
        </Box>
        <Flex flexDir="column" gap="5">
          {langProblem.assertions.map((test, i) => (
            <Flex key={i} gap={5}>
              <Code
                code={test.code ?? getLangAssertTemplate(lang)}
                onBlur={(val) => onAssertionChange(test.id, val)}
                lang={lang}
                width="90%"
              />
              <Button size={"xs"} variant={"outline"} onClick={() => deleteAssertion(test.id)}>
                X
              </Button>
            </Flex>
          ))}
        </Flex>
        <Box py={2}></Box>
        <Flex justifyContent={"center"}>
          <Button size={"xs"} colorScheme="primary" onClick={addAssertion}>
            ADD TEST
          </Button>
        </Flex>
      </Container>
    </Container>
  );
};

export default inject("managementStore")(observer(ProblemLangForm));
