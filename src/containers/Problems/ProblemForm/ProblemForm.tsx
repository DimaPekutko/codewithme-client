import * as React from "react";
import {
  AbsoluteCenter,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Code,
  Container,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Progress,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
} from "@chakra-ui/react";
import { FaBeer, FaHashtag } from "react-icons/fa";
import TextInput from "components/Input/TextInput";
import Label from "components/Label/Label";
import Problems from "../Problems";
import { useTranslation } from "react-i18next";
import ProblemLangForm from "./ProblemLangForm/ProblemLangForm";
import { LANGUAGES } from "consts";
import { ManagementStore } from "stores";
import { inject, observer } from "mobx-react";
import TagsMenu from "components/TagsMenu/TagsMenu";
import { toJS } from "mobx";

interface Props {
  problem: ProblemFull;
  managementStore?: ManagementStore;
}

const ProblemForm = ({ problem, managementStore }: Props) => {
  const { t } = useTranslation();

  const langsMap = React.useMemo(
    () => problem.lang_problems.reduce((map, lp) => ({ ...map, [lp.language]: lp }), {}),
    [problem],
  );

  const onProblemChange = (value) => managementStore?.updateProblem(problem.id, value);
  const onCategoriesChange = (value) => managementStore?.updateCategories(problem.id, { categories: value });
  const onLangsChange = (value) => managementStore?.updateLangs(problem.id, { langs: value });

  return (
    <Container
      maxW={"8xl"}
      background={"gray.800"}
      border={"1px solid black"}
      borderColor={"outline"}
      borderRadius={10}
    >
      <TextInput
        defaultValue={problem.title}
        type="input"
        fontSize={25}
        onBlur={(v) => onProblemChange({ title: v })}
      />
      <TextInput
        type="textarea"
        fontSize={17}
        defaultValue={problem.desc}
        onBlur={(v) => onProblemChange({ desc: v })}
      />
      <Flex alignItems={"center"} gap={5}>
        <Text>Complexity: </Text>
        <Flex my={5} width={"100%"} gap={5}>
          <Slider
            min={1}
            max={10}
            defaultValue={problem.complexity_level}
            width={"35%"}
            colorScheme="primary"
            onChange={(val) => onProblemChange({ complexity_level: val })}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text fontSize={20}>( {problem.complexity_level} 's level)</Text>
        </Flex>
      </Flex>
      <Flex alignItems={"center"} gap={5} mb={5}>
        <Text>Categories: </Text>
        <TagsMenu
          items={managementStore?.categoriesNames ?? []}
          checked={problem.categories.map((c) => c.name)}
          onChange={onCategoriesChange}
        />
      </Flex>
      <Flex alignItems={"center"} gap={5}>
        <Text>Languages: </Text>
        <TagsMenu items={LANGUAGES} checked={problem.langs} onChange={onLangsChange} />
      </Flex>
      <Tabs colorScheme="yellow" color={"labelText"}>
        <TabList w={"100%"}>
          {problem.langs.map((lang, i) => (
            <Tab fontSize={14} key={i}>
              {t(`lang.${lang}`)}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {problem.langs.map((lang, i) => (
            <TabPanel key={i}>
              <Container maxW={"6xl"}>
                <ProblemLangForm problemId={problem.id} langProblem={langsMap[lang]} />
              </Container>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default inject("managementStore")(observer(ProblemForm));
