import {
  Avatar,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Spacer,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import UserPreview from "components/User/UserPreview";
import PageLayout from "layouts/PageLayout/PageLayout";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserProfileStore } from "stores";

interface Props {
  userProfileStore?: UserProfileStore;
}

const UserProfilePage = ({ userProfileStore }: Props) => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const user = React.useMemo(() => userProfileStore?.user, [userProfileStore?.user]);

  React.useEffect(() => {
    userProfileStore?.setup(userId);
  }, [userId]);

  const getGameColor = (game: Game) => {
    const usrId = Number(userId);

    if (usrId === game.winner_id) return "green.500";
    else if (game.winner_id) return "red.400";
    return "yellow.500";
  };

  if (!user) {
    return "";
  }

  return (
    <PageLayout size="middle">
      <Flex width={"100%"} justifyContent={"center"}>
        <Flex width={"80%"} flexDir={"column"} mt={10} gap={5}>
          <Card w={"100%"} background="background.dark">
            <CardHeader>
              <Flex gap={5} alignItems={"center"}>
                <Avatar size={"md"} borderRadius={5} src={user.picture} name={user.full_name} />
                <Flex flexDir={"column"}>
                  <Heading size={"md"}>{user.full_name}</Heading>
                  <Text fontSize={"12"} color={"outline"}>
                    {user.email}
                  </Text>
                </Flex>
                <Spacer />
                <Flex gap={5}>
                  <Flex alignItems={"center"} gap={5}>
                    <Tag color={"text.dark"}>wins: {user.winned}</Tag>
                    <Tag color={"red.400"}>losses: {user.loosed}</Tag>
                    <Tag color={"text.dark"}>draws: {user.draws}</Tag>
                  </Flex>
                  <Badge fontSize={20} color={"yellow"}>
                    {user.rating}
                  </Badge>
                </Flex>
              </Flex>
            </CardHeader>
          </Card>

          <Card w={"100%"} background="background.dark">
            <CardHeader>
              <Heading size={"md"}>Games History:</Heading>
            </CardHeader>
            <CardBody>
              <TableContainer>
                <Table size={"sm"}>
                  <Tbody>
                    {userProfileStore?.userGames.map((game, idx) => (
                      <Tr
                        key={idx}
                        borderWidth={2}
                        borderLeftColor={getGameColor(game)}
                        _hover={{
                          borderLeftColor: "white",
                          cursor: "pointer",
                          bgGradient: `linear(to-l, background.dark, background.dark, background.dark, background.dark, ${getGameColor(game)})`,
                        }}
                        onClick={() => navigate(`/game/${game.id}`)}
                      >
                        <Td>
                          <Flex>
                            <UserPreview user={game.user1} />
                          </Flex>
                        </Td>
                        <Td>
                          <Flex flexDir={"column"} textAlign={"center"} gap={2}>
                            <Text>VS</Text>
                            <Badge
                              color={game.status === "finished" ? "yellow.300" : "green.300"}
                              background={"background.dark"}
                            >
                              {game.status}
                            </Badge>
                          </Flex>
                        </Td>
                        <Td>
                          <UserPreview user={game.user2} />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        </Flex>
      </Flex>
    </PageLayout>
  );
};

export default inject("userProfileStore")(observer(UserProfilePage));
