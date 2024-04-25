import * as React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import PageLayout from "layouts/PageLayout/PageLayout";
import { Problems } from "containers";
import UsersManagement from "containers/Users/UsersManagement";

const ManagementPage = () => {
  return (
    <PageLayout size="middle">
      <Tabs colorScheme="yellow">
        <TabList>
          <Tab>Problems</Tab>
          <Tab>Users</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Problems />
          </TabPanel>
          <TabPanel>
            <UsersManagement />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PageLayout>
  );
};

export default ManagementPage;
