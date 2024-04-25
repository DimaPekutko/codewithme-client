import { CredentialResponse, TokenResponse } from "@react-oauth/google";
import { get, post } from "api/utils";
import { jwtDecode } from "jwt-decode";
import { action, computed, flow, makeAutoObservable, makeObservable, observable } from "mobx";
import RootStore from "stores/RootStore/RootStore";

class UserProfileStore {
  root: RootStore;

  user: User | null = null;
  userGames: Game[] = [];

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  *setup(userId) {
    yield this.getUser(userId);
    yield this.getUserGames(userId);
  }

  *getUser(userId) {
    const resp = yield get("api", `user_profile/${userId}`, true);
    this.user = resp.data;
  }

  *getUserGames(userId) {
    const resp = yield get("api", `games`, true, { user_id: userId });
    this.userGames = resp.data;
  }
}

export default UserProfileStore;
