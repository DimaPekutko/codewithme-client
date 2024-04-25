import RootStore from "./RootStore/RootStore";
import AuthStore from "./AuthStore/AuthStore";
import ManagementStore from "./ManagementStore/ManagementStore";
import PlaygroundStore from "./PlaygroundStore/PlaygroundStore";
import HomeStore from "./HomeStore/HomeStore";
import GameStore from "./GameStore/GameStore";
import UserProfileStore from "./UserProfileStore/UserProfileStore";

const root = new RootStore();

const stores = {
  authStore: root.authStore,
  managementStore: root.managementStore,
  playgroundStore: root.playgroundStore,
  homeStore: root.homeStore,
  gameStore: root.gameStore,
  userProfileStore: root.userProfileStore,
};

export { stores, RootStore, AuthStore, ManagementStore, PlaygroundStore, HomeStore, GameStore, UserProfileStore };
