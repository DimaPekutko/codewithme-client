import { del, get, patch, post } from "api/utils";
import { makeAutoObservable } from "mobx";
import RootStore from "stores/RootStore/RootStore";

class ManagementStore {
  root: RootStore;

  problems: ProblemFull[] = [];
  problemsLoaded: boolean = false;
  problemsLoaders = {};
  categories: ProblemCategory[] = [];

  users: User[] = [];

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  get categoriesNames(): string[] {
    return this.categories.map((cat) => cat.name);
  }

  *setup() {
    yield this.getProblems();
    yield this.getCategories();
  }

  *getUsers() {
    const response = yield get("api", "users", true);
    this.users = response.data;
  }

  *toggleUserBlock(userId, toBlock) {
    const path = toBlock ? "block_user" : "unblock_user";
    const response = yield post("api", `users/${userId}/${path}`, true, {});
    if (response.status === 200) {
      this.users = this.users.map((user) => (user.id === userId ? { ...user, is_blocked: toBlock } : user));
    }
  }

  *getProblems() {
    const response = yield get("api", "problems", true);
    this.problems = response.data;
    this.problemsLoaded = true;
  }

  *getCategories() {
    const response = yield get("api", "categories", true);
    this.categories = response.data;
    return response.data;
  }

  *newTemplate() {
    const response = yield post("api", "problems/new", true, {});
    if (response.status === 200) {
      this.problems.push(response.data);
    }
  }

  *toggleProblem(id) {
    this.problemsLoaders[id] = true;
    let error = "";
    try {
      const resp = yield post("api", `problems/${id}/toggle`, true, null);
      this.problems = this.problems.map((p) => (p.id === id ? resp.data : p));
    } catch (res: any) {
      error = res.data.detail;
    } finally {
      delete this.problemsLoaders[id];
    }
    return error;
  }

  *updateCategories(id, value) {
    const resp = yield patch("api", `problems/${id}/categories`, true, value);
    if (resp.status === 200) {
      const problem = this.problems.find((p) => p.id === id);
      if (problem) {
        Object.assign(problem, { categories: resp.data });
      }
    }
  }

  *updateProblem(id, value) {
    const resp = yield patch("api", `problems/${id}`, true, value);
    if (resp.status === 200) {
      const problem = this.problems.find((p) => p.id === id);
      if (problem) {
        Object.assign(problem, value);
      }
    }
  }

  *updateLangs(id, value) {
    const resp = yield patch("api", `problems/${id}/active_langs`, true, value);
    if (resp.status === 200) {
      const problem = this.problems.find((p) => p.id === id);
      if (problem) {
        problem.langs = resp?.data?.langs;
      }
    }
  }

  *updateLangProblem(problemId, problemLangId, value) {
    const resp = yield patch("api", `lang_problems/${problemLangId}`, true, value);
    if (resp.status === 200) {
      const langProblem = this.problems
        .find((p) => p.id === problemId)
        ?.lang_problems.find((lp) => lp.id === problemLangId);

      if (langProblem) {
        Object.assign(langProblem, value);
      }
    }
  }

  *updateCodeAssertion(problemId, problemLangId, id, value) {
    const resp = yield patch("api", `code_assertions/${id}`, true, value);
    if (resp.status === 200) {
      const assertion = this.problems
        .find((p) => p.id === problemId)
        ?.lang_problems.find((lp) => lp.id === problemLangId)
        ?.assertions.find((test) => test.id === id);

      if (assertion) {
        assertion.code = resp?.data?.code;
      }
    }
  }

  *deleteCodeAssertion(problemId, problemLangId, id) {
    const resp = yield del("api", `code_assertions/${id}`, true);
    if (resp.status === 200) {
      const langProblem = this.problems
        .find((p) => p.id === problemId)
        ?.lang_problems.find((lp) => lp.id === problemLangId);

      if (langProblem) {
        langProblem.assertions = langProblem.assertions.filter((assertion) => assertion.id !== id);
      }
    }
  }

  *addCodeAssertion(problemId, problemLangId) {
    const resp = yield post("api", `lang_problems/${problemLangId}/add_test`, true, {});
    if (resp.status === 200) {
      const langProblem = this.problems
        .find((p) => p.id === problemId)
        ?.lang_problems.find((lp) => lp.id === problemLangId);

      if (langProblem) {
        langProblem.assertions.push(resp?.data);
      }
    }
  }

  *deleteProblem(id) {
    const response = yield del("api", `problems/${id}`, true);
    if (response.status === 200) {
      this.problems = this.problems.filter((p) => p.id !== id);
    }
  }
}

export default ManagementStore;
