import { Text } from "@chakra-ui/react";
import ProblemPlayground from "components/Playground/ProblemPlayground";
import PageLayout from "layouts/PageLayout/PageLayout";
import * as React from "react";
import { useParams } from "react-router-dom";
import { PlaygroundStore } from "stores";

interface Props {}

const ProblemPage = ({}: Props) => {
  const { id } = useParams();

  return (
    <PageLayout size="middle">
      <ProblemPlayground lproblemId={Number(id)} />
    </PageLayout>
  );
};

export default ProblemPage;
