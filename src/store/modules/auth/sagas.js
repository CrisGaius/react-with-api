import { put, all, takeLatest, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import { get } from "lodash";
import * as actions from "./actions";
import * as types from "../types";
import axios from "../../../services/axios";
import history from "../../../services/history";

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, "/tokens", payload);
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success("Success to sign in.");

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
  } catch (e) {
    toast.error("User or password is wrong.");
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, "auth.token", "");

  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({ payload }) {
  const { userId, name, email, password } = payload;
  try {
    if (userId) {
      yield call(axios.put, "users/", {
        email,
        name,
        password: password || undefined,
      });
      toast.success("Account has been updated.");
      yield put(actions.registerSuccess({ name, email, password }));
    }
  } catch (e) {
    const errors = get(e, "response.data.errors", []);
    // const status = get(e, "response.status", 0);

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error("Unknown error.");
    }

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
