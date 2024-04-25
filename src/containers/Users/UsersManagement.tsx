import { Flex } from "@chakra-ui/react";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { ManagementStore } from "stores";
import UsersTable from "./UsersTable";

interface Props {
  managementStore?: ManagementStore;
}

const UsersManagement = ({ managementStore }: Props) => {
  React.useEffect(() => {
    managementStore?.getUsers();
  }, []);

  const onUserBlock = (userId, toBlock) => {
    managementStore?.toggleUserBlock(userId, toBlock);
  };

  return <UsersTable users={managementStore?.users ?? []} isAdmin={true} onBlock={onUserBlock} />;
};

export default inject("managementStore")(observer(UsersManagement));
