import { defineStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export default defineStyleConfig({
  baseStyle: (props) => {
    return {
      color: "text.dark",
      background: "background.dark",
      fontWeight: "normal",
      borderWidth: 1,
      // borderRadius: 10,
      borderColor: "text.dark",
      px: 2,
    };
  },
});
