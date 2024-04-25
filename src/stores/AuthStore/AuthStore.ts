import { CredentialResponse, TokenResponse } from "@react-oauth/google";
import { get, post } from "api/utils";
import { jwtDecode } from "jwt-decode";
import { action, computed, flow, makeAutoObservable, makeObservable, observable } from "mobx";
import RootStore from "stores/RootStore/RootStore";

class AuthStore {
  root: RootStore;

  user: User | null = null;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  *autoLogin() {
    if (!this.user) {
      const resp = yield get("api", "me", true);
      this.user = resp.data;
    }
  }

  *googleAuth(tokenResponse: TokenResponse): any {
    const userData = yield this.getGoogleProfile(tokenResponse.access_token);
    try {
      const { data } = yield post("api", "google_sign_in", false, userData, false);
      localStorage.setItem("authToken", data.access_token);
      this.user = data.user;
      return true;
    } catch (e) {}
    return false;
  }

  *getGoogleProfile(token: string) {
    const resp = yield fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return yield resp.json();
  }

  logout() {
    this.user = null;
    localStorage.removeItem("authToken");
  }

  get loggedIn() {
    return this.user !== null;
  }
}

export default AuthStore;
