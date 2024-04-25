import AuthStore from "stores/AuthStore/AuthStore";
import ManagementStore from "stores/ManagementStore/ManagementStore";
import PlaygroundStore from "stores/PlaygroundStore/PlaygroundStore";
import HomeStore from "stores/HomeStore/HomeStore";
import SocketService from "stores/SocketService/SocketService";
import GameStore from "stores/GameStore/GameStore";
import UserProfileStore from "stores/UserProfileStore/UserProfileStore";

class RootStore {
  authStore: AuthStore;
  managementStore: ManagementStore;
  playgroundStore: PlaygroundStore;
  homeStore: HomeStore;
  gameStore: GameStore;
  userProfileStore: UserProfileStore;

  socketService: SocketService;

  constructor() {
    this.authStore = new AuthStore(this);
    this.managementStore = new ManagementStore(this);
    this.playgroundStore = new PlaygroundStore(this);
    this.homeStore = new HomeStore(this);
    this.socketService = new SocketService(this);
    this.gameStore = new GameStore(this);
    this.userProfileStore = new UserProfileStore(this);
  }
}

export default RootStore;
