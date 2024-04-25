import * as React from "react";
import { Avatar, Badge, Box, Flex, Text } from "@chakra-ui/react";

interface Props {
  user: User;
  isInverted?: boolean;
}

const UserPreview = ({ user, isInverted }: Props) => {
  return (
    <Flex width={"100%"} justifyContent={"center"}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={isInverted ? "row-reverse" : "row"}
        minW={"70%"}
        gap={5}
        background={"background.dark"}
        borderWidth={1}
        borderColor={"gray.700"}
        borderRadius={5}
        _hover={{ borderColor: "white" }}
      >
        <Avatar size={"xs"} src={user.picture} name={user.full_name} borderRadius={5} />
        <Text color={"text.dark"}>{user.full_name}</Text>
        <Badge colorScheme="yellow" mx={1}>
          {user.rating}
        </Badge>
      </Box>
    </Flex>
  );
};

export default UserPreview;
