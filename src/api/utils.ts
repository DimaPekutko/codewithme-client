import axios from "axios";
import { makeQueryParams } from "./urlHelpers";
import { URLS } from "./consts";

export const axiosInstance = (client, needAuth = false, isBlob = false) => {
  const { baseURL } = URLS[client];
  const authToken = `JWT ${localStorage.getItem("authToken")}`;

  const authorization = needAuth ? authToken : null;
  const params: any = {
    baseURL: `${baseURL}`,
    // timeout: 30000,
    responseType: isBlob ? "blob" : undefined,
    headers: {
      Authorization: authorization,
    },
  };

  const instance = axios.create(params);
  instance.interceptors.response.use(undefined, (err) => {
    console.error(err);
    return Promise.reject(err);
  });
  return instance;
};

export const get = (
  client: string,
  path: string,
  needAuth: boolean = false,
  params: any = null,
  isBlob: boolean = false,
  cancelToken: any = null,
) => {
  const instance = axiosInstance(client, needAuth, isBlob);

  if (params) {
    params = makeQueryParams(params);
    path = `${path}?${params}`;
  }

  return new Promise((resolve, reject) => {
    instance
      .get(path, { cancelToken: cancelToken ?? undefined })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log(error.message);
        } else {
          reject(error.response);
        }
      });
  });
};

export const post = (client, path, needAuth = false, data, isBlob = false, cancelToken = null) => {
  const instance = axiosInstance(client, needAuth, isBlob);
  return new Promise((resolve, reject) => {
    instance
      .post(path, data, { cancelToken: cancelToken ?? undefined })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log(error.message);
        } else {
          reject(error.response);
        }
      });
  });
};

export const put = (client, path, needAuth = false, data = null, cancelToken = null) => {
  const instance = axiosInstance(client, needAuth);

  return new Promise((resolve, reject) => {
    instance
      .put(path, data, { cancelToken: cancelToken ?? undefined })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log(error.message);
        } else {
          reject(error.response);
        }
      });
  });
};

export const patch = (client, path, needAuth = false, data = null, cancelToken = null) => {
  const instance = axiosInstance(client, needAuth);

  return new Promise((resolve, reject) => {
    instance
      .patch(path, data, { cancelToken: cancelToken ?? undefined })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log(error.message);
        } else {
          reject(error.response);
        }
      });
  });
};

export const del = (client, path, needAuth = false, data = null, cancelToken = null) => {
  const instance = axiosInstance(client, needAuth, false);
  return new Promise((resolve, reject) => {
    instance
      .request({
        method: "delete",
        url: path,
        data,
        cancelToken: cancelToken ?? undefined,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log(error.message);
        } else {
          reject(error.response);
        }
      });
  });
};
