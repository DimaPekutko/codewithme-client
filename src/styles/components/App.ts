import { defineStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export default defineStyleConfig({
  baseStyle: (props) => {
    const clr = mode("text.light", "text.dark")(props);
    return {
      maxW: "5xl",
      // minH: "50vh",
      color: clr,
      padding: 0,
      bgGradient: "linear(to-t, gray.800, gray.900 80%)",
    };
  },
});
