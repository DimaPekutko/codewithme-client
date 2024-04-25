import * as React from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { abcdef } from "@uiw/codemirror-theme-abcdef";
import { Box, Flex } from "@chakra-ui/react";
import { getLangExtension } from "./helpers";

interface CodeProps {
  width?: string;
  code: string;
  lang: Lang;
  disabled?: boolean;
  styles?: any;
  lineNumbers?: boolean;
  onBlur?: (value: string) => void;
  onChange?: (value: string) => void;
}

const Code = ({ width, code, lang, disabled, styles, lineNumbers, onBlur, onChange }: CodeProps) => {
  return (
    <Flex width={width}>
      <Box width={"100%"} fontSize={13}>
        <ReactCodeMirror
          maxWidth={"100%"}
          height="100%"
          style={styles ?? {}}
          basicSetup={{
            foldGutter: false,
            lineNumbers: Boolean(lineNumbers),
            tabSize: 4,
            highlightActiveLine: false,
          }}
          editable={!disabled}
          onBlur={onBlur ? (event) => onBlur(event.target.innerText) : () => {}}
          onChange={onChange ? (val) => onChange(val) : () => {}}
          theme={abcdef}
          value={code}
          extensions={[getLangExtension(lang)]}
        />
      </Box>
    </Flex>
  );
};

export default Code;
