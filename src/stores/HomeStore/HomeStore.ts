import { CredentialResponse } from "@react-oauth/google";
import { get, post } from "api/utils";
import { jwtDecode } from "jwt-decode";
import { action, computed, flow, makeAutoObservable, makeObservable, observable, toJS } from "mobx";
import RootStore from "stores/RootStore/RootStore";
import { io } from "socket.io-client";
import { URLS } from "api/consts";

type SearchPayload = {
  game_type: "online" | "offline";
  complexity_level: number;
  categories: string[];
  languages: string[];
};

class HomeStore {
  root: RootStore;

  searchPayload: SearchPayload = {
    game_type: "offline",
    complexity_level: 5,
    categories: [],
    languages: ["python"],
  };

  categories: ProblemCategory[] = [];

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  *setup() {
    yield this.getCategories();

    yield this.root.socketService.connect();
  }

  *getCategories() {
    this.categories = yield this.root.managementStore.getCategories();
    this.searchPayload.categories = [this.categories[0].name];
  }

  *assignToPayload(data) {
    Object.assign(this.searchPayload, data);
  }

  *startProblemSearch(callback: (data: any) => void) {
    yield this.root.socketService.sendEvent("search_problem", this.searchPayload);
    yield this.root.socketService.listenEvent("game_started", (data: any) => callback(data));
  }

  *abortProblemSearch() {
    yield this.root.socketService.sendEvent("stop_search_problem", this.searchPayload);
  }
}

export default HomeStore;
