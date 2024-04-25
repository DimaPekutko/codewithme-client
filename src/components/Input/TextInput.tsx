import {
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Flex,
  FormLabel,
  useEditableControls,
} from "@chakra-ui/react";
import Label from "components/Label/Label";
import * as React from "react";
import { FaPencilAlt } from "react-icons/fa";

interface Props {
  type: "input" | "textarea";
  defaultValue: string;
  fontSize: number;
  onBlur: (val: string) => void;
}

const Preview = ({ fontSize }: { fontSize: number }) => {
  const { isEditing } = useEditableControls();
  return (
    <Flex alignItems={"center"} gap={3} color="labelText">
      {!isEditing && <FaPencilAlt size={fontSize * 0.6} />}
      <EditablePreview width={"100%"} cursor={"pointer"} fontSize={fontSize} />
    </Flex>
  );
};

const TextInput = ({ type, fontSize, defaultValue, onBlur }: Props) => {
  const onTextBlur = (event) => onBlur(event.target.value);

  return (
    <Editable my={3} defaultValue={defaultValue} width={"100%"} borderBottomWidth={1} borderBottomColor={"outline"}>
      {<Preview fontSize={fontSize} />}
      {type === "input" ? (
        <EditableInput
          onBlur={onTextBlur}
          width={"100%"}
          fontSize={fontSize}
          color={"labelText"}
          border={"outline"}
          px={5}
        />
      ) : (
        <EditableTextarea
          onBlur={onTextBlur}
          width={"100%"}
          fontSize={fontSize}
          color={"labelText"}
          border={"outline"}
          p={5}
        />
      )}
    </Editable>
  );
};

export default TextInput;
