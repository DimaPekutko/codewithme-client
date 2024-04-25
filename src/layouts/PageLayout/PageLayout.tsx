import { Container } from "@chakra-ui/react";
import * as React from "react";

interface Props {
  children: any;
  size: "middle" | "wide";
}

const defaultProps = {
  size: "middle",
};

const widthMap = {
  middle: "6xl",
  wide: "8xl",
};

const PageLayout = ({ children, size }: Props) => {
  return (
    <Container p={0} m={0} maxW={widthMap[size]}>
      {children}
    </Container>
  );
};

PageLayout.defaultProps = defaultProps;

export default PageLayout;
