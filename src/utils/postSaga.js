import { call, put, takeLatest, race, delay } from "redux-saga/effects";
import {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure
} from "./postSlice";
import api from "./api";

// Worker saga: performs the async task
function* fetchPostsWorker(action) {
  try {
    // Example of using race to add a timeout (5s)
    const { response, timeout } = yield race({
      response: call(api.fetchPosts),
      timeout: delay(5000)
    });

    if (timeout) {
      yield put(fetchPostsFailure("Request timed out"));
      return;
    }

    yield put(fetchPostsSuccess(response));
  } catch (err) {
    yield put(fetchPostsFailure(err.message || "Unknown error"));
  }
}

// Watcher saga: take latest request and run worker
export function* watchFetchPosts() {
  yield takeLatest(fetchPostsRequest.type, fetchPostsWorker);
}

// Root saga for this feature (if you have multiple watchers)
export default function* postsSaga() {
  yield watchFetchPosts();
}
