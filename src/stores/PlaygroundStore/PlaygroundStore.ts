import { CredentialResponse } from "@react-oauth/google";
import { get, post } from "api/utils";
import { jwtDecode } from "jwt-decode";
import { action, computed, flow, makeAutoObservable, makeObservable, observable } from "mobx";
import RootStore from "stores/RootStore/RootStore";

class PlaygroundStore {
  root: RootStore;

  lproblem: LangProblemFull | null = null;

  gameId: number | null = null;
  userId: number | null = null;

  runtimes: Runtime[] = [];
  activeRuntime: Runtime | null = null;

  pingRuntimeLoop: any = null;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  *setup(id, gameId = null, userId = null) {
    this.gameId = gameId;
    this.userId = userId;

    yield this.getProblem(id);
    yield this.getRuntimes(id);
  }

  *getProblem(id) {
    const resp = yield get("api", `lang_problems/${id}`, true);
    this.lproblem = resp.data;
  }

  *getRuntimes(id) {
    const params =
      this.userId && this.gameId
        ? {
            user_id: this.userId,
            game_id: this.gameId,
          }
        : {};

    const resp = yield get("api", `playground/${id}/runtimes`, true, params);
    this.runtimes = resp.data;
    if (this.runtimes.length > 0) {
      yield this.setActiveRuntime(resp.data[0].id);
    }
  }

  *setActiveRuntime(id) {
    const runtime = this.runtimes.find((r) => r.id === id);
    if (runtime) {
      this.activeRuntime = runtime;
    }
    return runtime;
  }

  *submitCode(id, code, callback) {
    const resp = yield post("api", `playground/${id}/submit`, true, { code, game_id: this.gameId });
    const newRuntimeId = resp.data.id;

    this.runtimes = [resp.data, ...this.runtimes];
    yield this.setActiveRuntime(newRuntimeId);

    this.pingRuntimeLoop = setInterval(() => this.runtimePingLoop(newRuntimeId, callback), 500);
  }

  *runtimePingLoop(runtimeId, callback) {
    const targetRuntime = this.runtimes.find((r) => r.id === runtimeId);
    if (targetRuntime) {
      const resp = yield get("api", `runtimes/${runtimeId}`, true);
      if (resp.data.status !== "processing") {
        Object.assign(targetRuntime, resp.data);
        clearInterval(this.pingRuntimeLoop);
        this.pingRuntimeLoop = null;
        yield callback(targetRuntime.id);
      }
    }
  }

  *clear() {
    this.lproblem = null;
    this.gameId = null;
    this.userId = null;
    this.runtimes = [];
    this.activeRuntime = null;
    this.pingRuntimeLoop = null;
  }

  get isProcessing() {
    return Boolean(this.pingRuntimeLoop);
  }

  get isGame() {
    return this.gameId !== null;
  }
}

export default PlaygroundStore;
