import { CredentialResponse } from "@react-oauth/google";
import { get, post } from "api/utils";
import { jwtDecode } from "jwt-decode";
import { action, computed, flow, makeAutoObservable, makeObservable, observable, toJS } from "mobx";
import RootStore from "stores/RootStore/RootStore";
import { io } from "socket.io-client";
import { URLS } from "api/consts";

class GameStore {
  root: RootStore;

  game: Game | null = null;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  *setup(gameId, onRuntimeFinished) {
    yield this.getGame(gameId);

    yield this.root.socketService.connect();
    yield this.root.socketService.sendEvent("join_game", { game_id: gameId });

    yield this.root.socketService.listenEvent("game_runtime_finished", onRuntimeFinished);
    yield this.root.socketService.listenEvent("game_finished", this.gameFinished.bind(this));
  }

  *gameFinished(data) {
    this.game = data;
  }

  *notifyGamePlayers(runtimeId) {
    yield this.root.socketService.sendEvent("client_runtime_finished", { runtime_id: runtimeId });
  }

  *getGame(gameId: string) {
    const resp = yield get("api", `games/${gameId}`, true);
    this.game = resp.data;
  }
}

export default GameStore;
