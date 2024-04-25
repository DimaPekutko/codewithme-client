import RootStore from "stores/RootStore/RootStore";
import { Socket, io } from "socket.io-client";
import { URLS } from "api/consts";

class SocketService {
  root: RootStore;
  io: Socket | null = null;
  constructor(root: RootStore) {
    this.root = root;
  }

  async connect() {
    if (!this.io) {
      const token = localStorage.getItem("authToken") ?? "";
      this.io = io(URLS.socketApi.baseURL, { path: "/ws", auth: { token } });
    }
  }

  async sendEvent(eventName: string, event: any) {
    if (this.io) {
      this.io.emit(eventName, event);
    }
  }

  async listenEvent(eventName: string, callback: (...args) => void) {
    this.io?.on(eventName, async (...args) => await callback(...args));
  }
}

export default SocketService;
