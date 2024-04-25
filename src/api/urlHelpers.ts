import { stringify } from "qs";

export const makeQueryParams = (params) =>
  stringify(params, { arrayFormat: "repeat", encode: false });
