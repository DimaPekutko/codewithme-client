import { Badge, Flex, useStyleConfig } from "@chakra-ui/react";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  lang: Lang;
}

const Language = ({ lang }: Props) => {
  const { t } = useTranslation();
  const styles: any = useStyleConfig("Language");

  return <Badge {...styles}>{t(`lang.${lang}`)}</Badge>;
};

export default Language;
