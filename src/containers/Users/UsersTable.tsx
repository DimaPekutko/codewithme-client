import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { toJS } from "mobx";
import * as React from "react";

interface Props {
  users: User[];
  isAdmin: boolean;
  onBlock: (userId, block) => void;
}

const UsersTable = ({ users, isAdmin, onBlock }: Props) => {
  return (
    <TableContainer>
      <Table variant="simple" colorScheme="primary">
        <Thead>
          <Tr>
            <Th>User</Th>
            {isAdmin && <Th>Email</Th>}
            <Th>Rating</Th>
            <Th>Stats</Th>
            {isAdmin && <Th>Actions</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, idx) => (
            <Tr key={idx}>
              <Td>
                <Flex alignItems={"center"} gap={5}>
                  <Avatar
                    size={"xs"}
                    name={user.full_name}
                    src={user.picture}
                    loading="lazy"
                    borderRadius={5}
                    cursor="pointer"
                  />
                  <Text>{user.full_name}</Text>
                  <Text color={"pink"}>{user.is_blocked ? "(blocked)" : ""}</Text>
                </Flex>
              </Td>
              {isAdmin && <Td>{user.email}</Td>}
              <Td>
                <Tag>{user.rating}</Tag>
              </Td>
              <Td>
                <Tag>
                  wins: {user.winned} | loosed: {user.loosed} | draws: {user.draws}
                </Tag>
              </Td>
              {isAdmin && (
                <Td>
                  <Button
                    size={"xs"}
                    colorScheme={user.is_blocked ? "primary" : "red"}
                    onClick={() => onBlock(user.id, !user.is_blocked)}
                  >
                    {user.is_blocked ? "UNBLOCK" : "BLOCK"}
                  </Button>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
