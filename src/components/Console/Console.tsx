import * as React from "react";
import ReactCodeMirror, { EditorView } from "@uiw/react-codemirror";
import { abcdef } from "@uiw/codemirror-theme-abcdef";
import { Box, Flex } from "@chakra-ui/react";

interface Props {
  width?: string;
  value: string;
  styles?: any;
}

const theme = EditorView.theme(
  {
    "&": {
      color: "lime",
      backgroundColor: "black",
    },
  },
  { dark: true },
);

const Console = ({ width, value, styles }: Props) => {
  return (
    <Flex width={width}>
      <Box width={"100%"} fontSize={13}>
        <ReactCodeMirror
          maxWidth={"100%"}
          height={"100%"}
          style={styles ?? {}}
          basicSetup={{
            foldGutter: false,
            lineNumbers: false,
            tabSize: 4,
            highlightActiveLine: false,
          }}
          editable={false}
          theme={theme}
          value={value}
        />
      </Box>
    </Flex>
  );
};

export default Console;
