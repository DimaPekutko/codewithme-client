import { Badge, Center, Flex, Heading, Tab, TabList, Tabs, Tag, Text } from "@chakra-ui/react";
import ProblemPlayground from "components/Playground/ProblemPlayground";
import UserPreview from "components/User/UserPreview";
import { useNotify } from "hooks";
import PageLayout from "layouts/PageLayout/PageLayout";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { FaBan } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { AuthStore, GameStore, PlaygroundStore } from "stores";

interface Props {
  gameStore?: GameStore;
  authStore?: AuthStore;
}

const GamePage = ({ gameStore, authStore }: Props) => {
  const [selectedUserIdx, setSelectedUserIdx] = React.useState<any>(null);
  const { id: gameId } = useParams();
  const notify = useNotify();

  const getUserTabIdx = (user: User): number => (user.id === game?.user1.id ? 0 : 2);
  const getTabUser = (): User => (selectedUserIdx === 0 ? game?.user1 : game?.user2)!;

  const game = React.useMemo(() => gameStore?.game, [gameStore?.game]);
  const gameFinished = game?.status === "finished";

  const hideOpponentTab = React.useMemo(() => {
    if (!authStore?.user) return false;

    const userTabIdx = getUserTabIdx(authStore?.user);
    return userTabIdx !== selectedUserIdx && !gameFinished;
  }, [selectedUserIdx]);

  const onCodeProcessed = React.useCallback(async (runtimeId: number) => {
    await gameStore?.notifyGamePlayers(runtimeId);
  }, []);

  const onRuntimeFinishedEvent = (data) => {
    const user = authStore?.user?.id === gameStore?.game?.user1 ? gameStore?.game?.user1 : gameStore?.game?.user2;

    notify(
      <Flex gap={5} color={"background.dark"}>
        <UserPreview user={user!} />
        <Badge colorScheme="background.dark">failed={data.failed}</Badge>
        <Badge colorScheme="background.dark">passed={data.passed}</Badge>
      </Flex>,
      "info",
    );

    if (!data.failed && data.passed) {
      notify(`${user?.full_name} won the game!`, "success");
    }
  };

  React.useEffect(() => {
    gameStore?.setup(gameId, onRuntimeFinishedEvent);
  }, []);

  React.useEffect(() => {
    if (authStore?.user) {
      const idx = getUserTabIdx(authStore.user);
      setSelectedUserIdx(idx);
    }
  }, [game]);

  const getTabGradient = () => {
    if (!game || !gameFinished) return "";

    const dir = {
      [game?.user1.id]: "r",
      [game?.user2.id]: "l",
    };
    return `linear(to-${dir[game.winner_id!]}, blue.500, background.dark, red.400)`;
  };

  if (!game || selectedUserIdx === null) {
    return "";
  }
  return (
    <PageLayout size="middle">
      <Tabs
        index={selectedUserIdx}
        my={5}
        isFitted
        colorScheme="gray"
        variant={gameFinished ? "line" : "enclosed"}
        onChange={(idx) => setSelectedUserIdx(idx)}
        bgGradient={getTabGradient()}
      >
        <TabList borderColor={"outline"}>
          <Tab>
            <UserPreview user={game.user1} />
          </Tab>
          <Tab isDisabled _disabled={{ cursor: "pointer" }}>
            <Flex flexDir={"column"}>
              <Text>VS</Text>
              {gameFinished && <Text color="yellow.300">(Finished)</Text>}
            </Flex>
          </Tab>
          <Tab>
            <UserPreview user={game.user2} isInverted />
          </Tab>
        </TabList>
      </Tabs>
      {!hideOpponentTab ? (
        <ProblemPlayground
          lproblemId={game.lang_problem_id}
          gameId={game.id}
          userId={getTabUser().id}
          viewOnly={game.status === "finished"}
          onCodeProcessed={onCodeProcessed}
        />
      ) : (
        <Center mt={"15vh"}>
          <Flex flexDir={"column"} alignItems={"center"} gap={5} color={"yellow.300"}>
            <Heading size={"md"}>You can not see opponent's code during the game</Heading>
            <FaBan fontSize={"50px"} />
          </Flex>
        </Center>
      )}
    </PageLayout>
  );
};

export default inject("gameStore", "authStore")(observer(GamePage));
