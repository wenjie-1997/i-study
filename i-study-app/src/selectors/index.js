import _ from "lodash";

export const getAuth = (state) => _.get(state, "auth", null);
export const getUser = (state) => _.get(state, "user", null);
